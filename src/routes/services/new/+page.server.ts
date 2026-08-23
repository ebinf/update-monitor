import { fail, isRedirect, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/database';
import { resolve } from '$app/paths';
import { PrismaClientKnownRequestError } from '$prisma/internal/prismaNamespace';
import { deserialize } from '$lib/server/updateServices/Serialization';

export const load: PageServerLoad = async () => {
	const servers = await prisma.server.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const remotes = await prisma.remote.findMany({});

	const remotesWithNames = await Promise.all(
		remotes.map(async (remote) => {
			const updateService = await deserialize(remote);
			return {
				id: remote.id,
				type: remote.type,
				name: updateService.name
			};
		})
	);

	return {
		servers,
		remotes: remotesWithNames
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const server = parseInt(formData.get('server') as string);
		const remote = parseInt(formData.get('remote') as string);

		if (!name) {
			return fail(400, { error: 'Name is required' });
		}

		try {
			const service = await prisma.service.create({
				data: {
					name,
					server: {
						connect: {
							id: server
						}
					},
					remote: {
						connect: {
							id: remote
						}
					}
				}
			});

			redirect(303, resolve('/services/[id=integer]', { id: String(service.id) }));
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
				return fail(400, { error: 'A service with this name already exists' });
			}
			return fail(500, { error: 'An error occurred while creating the service' });
		}
	}
};
