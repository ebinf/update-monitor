import type { PageServerLoad } from './$types';
import { deserialize } from '$lib/server/updateServices/Serialization';

export const load: PageServerLoad = async ({ parent }) => {
	const { service } = await parent();
	if (!service.remote) {
		return {
			releases: []
		};
	}

	const remote = await deserialize(service.remote);
	return {
		releases: remote.getAllReleases()
	};
};
