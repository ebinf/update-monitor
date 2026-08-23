import prisma from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	return {
		services: prisma.service.findMany({
			include: {
				remote: { include: { latest: true } },
				server: true
			}
		})
	};
};
