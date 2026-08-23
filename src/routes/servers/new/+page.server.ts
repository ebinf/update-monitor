import { fail, isRedirect, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import prisma from '$lib/server/database';
import { resolve } from '$app/paths';
import { PrismaClientKnownRequestError } from '$prisma/internal/prismaNamespace';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name) {
			return fail(400, { error: 'Name is required' });
		}

		try {
			const server = await prisma.server.create({
				data: {
					name
				}
			});

			redirect(303, resolve('/servers/[id=integer]', { id: String(server.id) }));
		} catch (error) {
			if (isRedirect(error)) {
				throw error;
			}

			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
				return fail(400, { error: 'A server with this name already exists' });
			}
			return fail(500, { error: 'An error occurred while creating the server' });
		}
	}
};
