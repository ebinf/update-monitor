import type { Remote } from '$prisma/client';
import {
	UpdateServiceOptionsSchema,
	type UpdateService,
	type UpdateServiceOptions
} from './UpdateService';
import { z } from 'zod';
import { GitHub, GitHubOptionsSchema, type GitHubOptions } from './GitHub';

export async function serialize(service: UpdateService): Promise<Remote> {
	return service.serialize();
}

export async function deserialize(remote: Remote): Promise<UpdateService> {
	const id = remote.id;
	const config = eval('(' + remote.config + ')') satisfies UpdateServiceOptions;
	if (remote.type === 'GitHub') {
		const gitHubOptions: GitHubOptions = z
			.intersection(UpdateServiceOptionsSchema, GitHubOptionsSchema)
			.parse(config);
		return new GitHub(id, gitHubOptions);
	}
	throw new Error(`Unknown remote type ${remote.type}`);
}
