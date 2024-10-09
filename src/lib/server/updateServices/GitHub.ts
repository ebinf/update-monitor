import { GITHUB_API_TOKEN_CLASSIC, GITHUB_API_TOKEN_FINE } from '$env/static/private';
import type { Release } from '@prisma/client';
import {
	defaultVersionPattern,
	UpdateService,
	type UpdateServiceOptions
} from '$lib/server/updateServices/UpdateService';
import { Octokit } from 'octokit';
import prisma from '$lib/server/database';
import { z } from 'zod';

export type GitHubOptions = {
	owner: string;
	repo: string;
	useTagName?: boolean;
	hidePrereleases?: boolean;
};

export const GitHubOptionsSchema = z.object({
	owner: z.string(),
	repo: z.string(),
	useTagName: z.boolean().optional(),
	tag: z.string().optional()
});

export class GitHub extends UpdateService {
	protected readonly options: UpdateServiceOptions & GitHubOptions;
	private octokit: Octokit;
	constructor(id: number, options: UpdateServiceOptions & GitHubOptions) {
		super(id, options);
		this.options = options;
		this.octokit = new Octokit({
			auth: GITHUB_API_TOKEN_FINE
		});
	}

	private releaseFromJson(json: {
		tag_name: string;
		name: string | null;
		body?: string | null;
		html_url: string;
		prerelease: boolean;
		published_at: string | null;
		[key: string]: any;
	}): Release {
		const version = this.parseVersion(
			this.options.useTagName || !json.name ? json.tag_name : json.name
		);
		return {
			id: 1,
			remoteId: this.id,
			remoteVersion: json.tag_name,
			version,
			hidden:
				!this.matchesFilter(version) || ((this.options.hidePrereleases ?? true) && json.prerelease),
			link: json.html_url,
			publishedAt: json.published_at ? new Date(json.published_at) : null,
			releaseNotes: json.body?.trim() || null,
			name: json.name,
			prerelease: json.prerelease
		};
	}

	async fetchReleases(): Promise<void> {
		console.log('Fetching GitHub releases');
		const iterator = this.octokit.paginate.iterator(this.octokit.rest.repos.listReleases, {
			owner: this.options.owner,
			repo: this.options.repo
		});
		for await (const { data } of iterator) {
			for (const releaseJson of data) {
				const release = this.releaseFromJson(releaseJson);
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
		}
		console.log('Updating latest version');
		const latestVersion = await this.octokit.rest.repos.getLatestRelease({
			owner: this.options.owner,
			repo: this.options.repo
		});
		await prisma.remote.update({
			where: {
				id: this.id
			},
			data: {
				latest: {
					connect: {
						remoteId_remoteVersion: {
							remoteId: this.id,
							remoteVersion: latestVersion.data.tag_name
						}
					}
				}
			}
		});
	}
}
