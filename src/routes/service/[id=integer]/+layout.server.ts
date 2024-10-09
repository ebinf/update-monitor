import prisma from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { deserialize } from '$lib/server/updateServices/Serialization';

export const load: LayoutServerLoad = async ({ params }) => {
	const service = await prisma.service.findUnique({
		where: { id: parseInt(params.id) },
		include: { remote: { include: { latest: true } }, server: true }
	});
	if (!service) throw error(404, 'Service not found');
	return { service };
};
