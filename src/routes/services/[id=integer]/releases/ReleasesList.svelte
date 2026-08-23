<script lang="ts">
	import type { Release } from '$prisma/client';
	import { onMount } from 'svelte';
	import ReleaseComponent from './Release.svelte';
	import ReleasesSkeleton from './ReleasesSkeleton.svelte';

	interface Props {
		releases?: Release[] | Promise<Release[]>;
		latest?: Release | Promise<Release | null> | null;
		installed?: string | null;
		showHidden?: boolean;
		manualLocal?: boolean;
	}

	let {
		releases = [],
		latest = $bindable(null),
		installed = null,
		showHidden = false,
		manualLocal = true
	}: Props = $props();

	onMount(async () => {
		if (latest instanceof Promise) {
			latest = await latest;
		}
	});

	let isLatest = $derived((release: Release) => {
		if (latest instanceof Promise) return false;
		return release.version === latest?.version;
	});

	let isInstalled = $derived((release: Release) => {
		if (!installed) return false;
		return release.version === installed;
	});
</script>

<table class="mt-6 w-full text-left whitespace-nowrap">
	<colgroup>
		<col class="w-full sm:w-1/2" />
		<col class="lg:w-1/4" />
		<col class="lg:w-1/4" />
		<col class="lg:w-56" />
	</colgroup>
	<thead class="border-b border-white/10 text-sm leading-6 text-white">
		<tr>
			<th scope="col" class="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8">Name</th>
			<th scope="col" class="py-2 pr-8 pl-0 font-semibold">Version</th>
			<th scope="col" class="py-2 pr-8 pl-0 text-right font-semibold sm:pr-6 lg:pr-8">Published</th>
			<th scope="col" class="py-2 pr-4 pl-0"></th>
		</tr>
	</thead>
	<tbody class="divide-y divide-white/5">
		{#await releases}
			<ReleasesSkeleton />
		{:then releases}
			{#each releases.filter((release) => showHidden || !release.hidden) as release}
				<ReleaseComponent
					{release}
					installed={isInstalled(release)}
					latest={isLatest(release)}
					{manualLocal}
				/>
			{/each}
		{/await}
	</tbody>
</table>
