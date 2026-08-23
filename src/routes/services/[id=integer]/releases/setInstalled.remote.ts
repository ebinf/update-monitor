import { command, getRequestEvent } from '$app/server';
import prisma from '$lib/server/database';
import z from 'zod';

export const setInstalled = command(
	z
		.object({
			release: z.number().int()
		})
		.strict(),
	async ({ release }) => {
		const { params } = getRequestEvent();

		const dbRelease = await prisma.release.findUniqueOrThrow({
			where: {
				id: release
			}
		});

		await prisma.service.update({
			where: {
				id: parseInt(params.id!)
			},
			data: {
				installedVersion: dbRelease.version
			}
		});
	}
);
