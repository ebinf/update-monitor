import type { Remote } from '@prisma/client';
import { UpdateServiceOptionsSchema, type UpdateService } from './UpdateService';
import { GitHub, GitHubOptionsSchema, type GitHubOptions } from './GitHub';

export async function serialize(service: UpdateService): Promise<Remote> {
	return service.serialize();
}

export async function deserialize(remote: Remote): Promise<UpdateService> {
	const id = remote.id;
	const config = eval('(' + remote.config + ')');
	if (remote.type === 'GitHub') {
		UpdateServiceOptionsSchema.merge(GitHubOptionsSchema).parse(config);
		return new GitHub(id, config satisfies GitHubOptions);
	}
	throw new Error(`Unknown remote type ${remote.type}`);
}
