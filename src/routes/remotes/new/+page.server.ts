import { fail, isRedirect, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/database';
import { resolve } from '$app/paths';
import { PrismaClientKnownRequestError } from '$prisma/internal/prismaNamespace';
import { env } from '$env/dynamic/private';
import { GitHubOptionsSchema } from '$lib/server/updateServices/GitHub';
import serializeJavascript from 'serialize-javascript';

export const load: PageServerLoad = async () => {
	return {
		providers: [
			{
				name: 'GitHub',
				description: 'Fetch releases from a GitHub repository.',
				enabled: env.GITHUB_API_TOKEN_FINE !== undefined
			},
			{
				name: 'Docker Hub',
				description: 'Fetch releases from Docker Hub.',
				enabled: env.DOCKER_HUB_TOKEN !== undefined
			}
		]
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as string;

		if (!provider) {
			return fail(400, { error: 'Provider is required', messages: null });
		}

		let providerOptions;

		switch (provider) {
			case 'GitHub':
				const options = GitHubOptionsSchema.safeParse(Object.fromEntries(formData.entries()));
				if (!options.success) {
					return fail(400, { error: 'Invalid GitHub options', messages: options.error.issues });
				}
				providerOptions = options.data;
				break;

			case 'Docker Hub':
				// Handle Docker Hub options here
				break;

			default:
				return fail(400, { error: 'Invalid provider', messages: null });
		}

		if (!providerOptions) {
			return fail(400, { error: 'Failed to create update service', messages: null });
		}

		try {
			const remote = await prisma.remote.create({
				data: {
					type: provider,
					config: serializeJavascript(providerOptions)
				}
			});

			redirect(303, resolve('/remotes/[id=integer]', { id: String(remote.id) }));
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			console.error('Error creating remote:', error);

			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
				return fail(400, {
					error: 'A remote with this provider and options already exists',
					messages: null
				});
			}
			return fail(500, { error: 'An error occurred while creating the remote', messages: null });
		}
	}
};
