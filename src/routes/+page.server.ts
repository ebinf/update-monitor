import prisma from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	const services = prisma.service.findMany({
		include: {
			remote: { include: { latest: true } },
			server: true
		}
	});
	const updateAvailable = (service: Awaited<typeof services>[number]) => {
		const latestRelease = service.remote?.latest?.version;
		if (!latestRelease) return false;
		const installedVersion = service.installedVersion;
		if (!installedVersion) return true;
		return latestRelease !== installedVersion;
	};
	const servicesWithUpdateAvailable = services.then((services) =>
		services.filter((service) => updateAvailable(service))
	);
	return { services: servicesWithUpdateAvailable };
};
