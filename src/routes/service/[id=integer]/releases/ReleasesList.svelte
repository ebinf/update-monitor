<script lang="ts">
	import type { Release } from '@prisma/client';
	import { onMount } from 'svelte';
	import ReleaseComponent from './Release.svelte';
	import ReleasesSkeleton from './ReleasesSkeleton.svelte';

	export let releases: Release[] | Promise<Release[]> = [];
	export let latest: Release | Promise<Release | null> | null = null;
	export let installed: string | null = null;
	export let showHidden: boolean = false;

	onMount(async () => {
		if (latest instanceof Promise) {
			latest = await latest;
		}
	});

	$: isLatest = (release: Release) => {
		if (latest instanceof Promise) return false;
		return release.version === latest?.version;
	};

	$: isInstalled = (release: Release) => {
		if (!installed) return false;
		return release.version === installed;
	};
</script>

<table class="mt-6 w-full whitespace-nowrap text-left">
	<colgroup>
		<col class="w-full sm:w-1/2" />
		<col class="lg:w-1/4" />
		<col class="lg:w-1/4" />
	</colgroup>
	<thead class="border-b border-white/10 text-sm leading-6 text-white">
		<tr>
			<th scope="col" class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">Name</th>
			<th scope="col" class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">Version</th>
			<th
				scope="col"
				class="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
				>Published</th
			>
		</tr>
	</thead>
	<tbody class="divide-y divide-white/5">
		{#await releases}
			<ReleasesSkeleton />
		{:then releases}
			{#each releases.filter((release) => showHidden || !release.hidden) as release}
				<ReleaseComponent {release} installed={isInstalled(release)} latest={isLatest(release)} />
			{/each}
		{/await}
	</tbody>
</table>
