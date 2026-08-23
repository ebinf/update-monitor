import { env } from '$env/dynamic/private';
import type { Release } from '$prisma/client';
import { UpdateService, type UpdateServiceOptions } from '$lib/server/updateServices/UpdateService';
import prisma from '$lib/server/database';
import { z } from 'zod';

export type DockerHubOptions = UpdateServiceOptions & {
	namespace: string;
	repo: string;
	mode?: 'recent' | 'withTag';
	latestTag?: string;
};

export const DockerHubOptionsSchema = z.object({
	namespace: z.string().min(1, { message: 'Namespace is required' }),
	repo: z.string().min(1, { message: 'Repo is required' }),
	mode: z.enum(['recent', 'withTag']).optional(),
	latestTag: z.string().optional()
});

export class DockerHub extends UpdateService {
	protected readonly options: UpdateServiceOptions & DockerHubOptions;

	private accessToken: string | null = null;

	constructor(id: number, options: UpdateServiceOptions & DockerHubOptions) {
		super(id, options);
		this.options = options;
	}

	get name(): string {
		return this.options.namespace + '/' + this.options.repo;
	}

	private async getAccessToken(): Promise<void> {
		const request = await fetch('https://hub.docker.com/v2/auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier: env.DOCKER_HUB_USERNAME,
				secret: env.DOCKER_HUB_TOKEN
			})
		});
		if (!request.ok) {
			throw new Error(
				`Failed to get Docker Hub access token: ${request.status} ${request.statusText}`
			);
		}
		const data = await request.json();
		this.accessToken = data.access_token;
	}

	private async apiRequest(endpoint: string, init?: RequestInit): Promise<any> {
		if (!this.accessToken) {
			await this.getAccessToken();
		}
		const request = await fetch(`https://hub.docker.com/v2/${endpoint}`, {
			...init,
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
				...init?.headers
			}
		});
		if (!request.ok) {
			if (request.status === 401) {
				this.accessToken = null;
				await this.getAccessToken();
				return this.apiRequest(endpoint, init);
			}
			throw new Error(`Failed to fetch Docker Hub API: ${request.status} ${request.statusText}`);
		}
		return request.json();
	}

	async fetchReleases(): Promise<void> {
		console.log('Fetching Docker Hub releases');
		let latestTag = null;
		for (let pageNo = 1; ; pageNo++) {
			const page = await this.apiRequest(
				`namespaces/${this.options.namespace}/repositories/${this.options.repo}/tags?page=${pageNo}&page_size=100`
			);
			for (const tag of page.results) {
				const version = tag.name;
				const release: Release = {
					id: 1,
					remoteId: this.id,
					remoteVersion: tag.digest ?? tag.name,
					version,
					hidden: !this.matchesFilter(version),
					link: null,
					publishedAt: new Date(tag.last_updated),
					releaseNotes: null,
					name: version,
					prerelease: false
				};
				if (this.options.mode === 'withTag' && this.options.latestTag === version) {
					latestTag = tag;
				}
				await prisma.release.upsert({
					where: {
						remoteId_remoteVersion: {
							remoteId: this.id,
							remoteVersion: release.remoteVersion
						}
					},
					create: {
						...release,
						id: undefined
					},
					update: {
						...release,
						id: undefined
					}
				});
			}
			if (!page.next) {
				break;
			}
		}
		console.log(latestTag);
		const latestVersion = await prisma.release.findFirst({
			where: {
				remote: {
					id: this.id
				},
				remoteVersion: latestTag?.digest,
				version: {
					not: {
						equals: latestTag.name
					}
				}
			},
			orderBy: {
				publishedAt: 'desc'
			}
		});
		await prisma.remote.update({
			where: {
				id: this.id
			},
			data: {
				latest: {
					connect: {
						id: latestVersion?.id
					}
				}
			}
		});
	}
}
