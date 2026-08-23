import type { Remote } from '$prisma/client';
import {
	UpdateServiceOptionsSchema,
	type UpdateService,
	type UpdateServiceOptions
} from './UpdateService';
import { z } from 'zod';
import { GitHub, GitHubOptionsSchema, type GitHubOptions } from './GitHub';
import { DockerHub, DockerHubOptionsSchema, type DockerHubOptions } from './DockerHub';

export async function serialize(service: UpdateService): Promise<Remote> {
	return service.serialize();
}

export async function deserialize(remote: Remote): Promise<UpdateService> {
	const id = remote.id;
	const config = eval('(' + remote.config + ')') satisfies UpdateServiceOptions;
	switch (remote.type) {
		case 'GitHub': {
			const gitHubOptions: GitHubOptions = z
				.intersection(UpdateServiceOptionsSchema, GitHubOptionsSchema)
				.parse(config);
			return new GitHub(id, gitHubOptions);
		}

		case 'Docker Hub': {
			const dockerHubOptions: DockerHubOptions = z
				.intersection(UpdateServiceOptionsSchema, DockerHubOptionsSchema)
				.parse(config);
			return new DockerHub(id, dockerHubOptions);
		}

		default:
			throw new Error(`Unknown remote type ${remote.type}`);
	}
}
