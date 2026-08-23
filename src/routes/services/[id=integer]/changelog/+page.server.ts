import type { PageServerLoad } from './$types';
import { deserialize } from '$lib/server/updateServices/Serialization';

export const load: PageServerLoad = async ({ parent }) => {
	const { service } = await parent();
	if (!service.remote) {
		return {
			upToDate: false,
			changelogs: []
		};
	}

	const upToDate = service.remote.latest?.version === service.installedVersion;
	const remote = await deserialize(service.remote);

	return {
		upToDate,
		changelogs: remote.getRelevantChangelogs(service.installedVersion)
	};
};
