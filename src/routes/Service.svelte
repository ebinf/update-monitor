<script lang="ts">
	import RemoteProviderLabel from '$lib/RemoteProviderLabel.svelte';
	import StatusLabel from '$lib/StatusLabel.svelte';
	import VersionIcon from '$lib/VersionIcon.svelte';
	import type { Prisma } from '@prisma/client';
	import moment from 'moment';

	export let service: Prisma.ServiceGetPayload<{
		include: { remote: { include: { latest: true } }; server: true };
	}>;

	let link = `/service/${service.id}/releases`;
</script>

<li class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
	<div class="min-w-0 flex-auto">
		<div class="flex items-center gap-x-3">
			<VersionIcon latest={service.remote?.latest} installed={service.installedVersion} />
			<h2 class="min-w-0 text-sm font-semibold leading-6 text-white">
				<a href={link} class="flex gap-x-2">
					<span class="truncate">{service.server.name}</span>
					<span class="text-background-400">/</span>
					<span class="whitespace-nowrap">{service.name}</span>
					<span class="absolute inset-0"></span>
				</a>
			</h2>
		</div>
		<div class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-background-400">
			<p class="truncate">Releases from <RemoteProviderLabel remote={service.remote} /></p>
			{#if service.remote?.lastFetched}
				<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-background-300">
					<circle cx="1" cy="1" r="1" />
				</svg>
				<p class="whitespace-nowrap">
					{#if service.remote.isFetching}
						<span class="animate-pulse">Fetching...</span>
					{:else}
						Last fetched {moment(service.remote.lastFetched).fromNow()}
					{/if}
				</p>
			{/if}
		</div>
	</div>
	<StatusLabel installed={service.installedVersion} latest={service.remote?.latest} />
	<svg
		class="h-5 w-5 flex-none text-background-400"
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
	>
		<path
			fill-rule="evenodd"
			d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
			clip-rule="evenodd"
		/>
	</svg>
</li>
