import prisma from '$lib/server/database';
import type { Release, Remote } from '@prisma/client';
import { z } from 'zod';
import serializeJavascript from 'serialize-javascript';

export const defaultVersionPattern = /^(?:v|ver|version)\s?(\d+\..+)$/i;
export const defaultFilterPattern = /^((?!alpha|beta|rc|release-candidate|pre|dev).)*$/i;

export type UpdateServiceOptions = {
	versionPattern?: RegExp;
	filterPattern?: RegExp;
};

export const UpdateServiceOptionsSchema = z.object({
	versionPattern: z.instanceof(RegExp).optional(),
	filterPattern: z.instanceof(RegExp).optional()
});

export abstract class UpdateService {
	protected readonly id: number;
	protected readonly options: UpdateServiceOptions;
	protected fetchingPromiseResolvers: ((resolve: void | PromiseLike<void>) => void)[] = [];
	constructor(id: number, options: UpdateServiceOptions) {
		this.id = id;
		this.options = options;
	}

	async serialize(): Promise<Remote> {
		return {
			id: this.id,
			type: this.constructor.name,
			config: serializeJavascript(this.options),
			lastFetched: await this.getLastFetched(),
			latestId: (await this.getLatestRelease())?.id ?? null,
			isFetching: false
		};
	}

	async getAllReleases(): Promise<Release[]> {
		console.log('getAllReleases');
		await this.fetch();
		return prisma.release.findMany({
			where: {
				remoteId: this.id
			},
			orderBy: {
				publishedAt: 'desc'
			}
		});
	}

	private async resolveFetchingPromise(): Promise<void> {
		this.fetchingPromiseResolvers.forEach((resolve) => {
			console.log('Promise resolved!');
			resolve();
		});
		this.fetchingPromiseResolvers = [];
		await prisma.remote.update({
			where: {
				id: this.id
			},
			data: {
				isFetching: false
			}
		});
	}

	private enqueueFetchingPromise(): Promise<void> {
		let resolver: (resolve: void | PromiseLike<void>) => void;
		const promise = new Promise<void>((resolve) => {
			resolver = resolve;
		});
		console.log('Promise pushed!');
		this.fetchingPromiseResolvers.push(resolver!);
		return promise;
	}

	async fetch(): Promise<void> {
		if (await this.isFetching()) {
			return this.enqueueFetchingPromise();
		}
		await prisma.remote.update({
			where: {
				id: this.id
			},
			data: {
				isFetching: true
			}
		});
		const lastFetched = await this.getLastFetched();
		if (lastFetched && lastFetched > new Date(Date.now() - 1000 * 60 * 60 * 24)) {
			return this.resolveFetchingPromise();
		}
		await this.fetchReleases();
		console.log('Updating lastFetched');
		await prisma.remote.update({
			where: {
				id: this.id
			},
			data: {
				lastFetched: new Date()
			}
		});
		await this.resolveFetchingPromise();
	}

	abstract fetchReleases(): Promise<void>;

	matchesFilter(version: string): boolean {
		if (!this.options.filterPattern) return true;
		return this.options.filterPattern.test(version);
	}

	parseVersion(version: string): string {
		if (!this.options.versionPattern) return version;
		return version.match(this.options.versionPattern)?.[1] ?? version;
	}

	async getLatestRelease(): Promise<Release | null> {
		console.log('getLatestRelease');
		await this.fetch();
		return (
			(
				await prisma.remote.findUnique({
					where: {
						id: this.id
					},
					select: {
						latest: true
					}
				})
			)?.latest ?? null
		);
	}

	async getLastFetched(): Promise<Date | null> {
		return (
			await prisma.remote.findUniqueOrThrow({
				where: {
					id: this.id
				},
				select: {
					lastFetched: true
				}
			})
		).lastFetched;
	}

	async isFetching(): Promise<boolean> {
		return (
			await prisma.remote.findUniqueOrThrow({
				where: {
					id: this.id
				},
				select: {
					isFetching: true
				}
			})
		).isFetching;
	}
}
