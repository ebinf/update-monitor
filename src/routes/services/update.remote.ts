import { command } from '$app/server';
import prisma from '$lib/server/database';
import { deserialize } from '$lib/server/updateServices/Serialization';

export const updateAll = command(async () => {
	const remotes = await prisma.remote.findMany({});
	await Promise.all(
		remotes.map(async (remote) => {
			const updatedRemote = await deserialize(remote);
			return updatedRemote.fetch();
		})
	);
});
