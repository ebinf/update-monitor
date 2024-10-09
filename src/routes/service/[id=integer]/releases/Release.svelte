<script lang="ts">
	import type { Release } from '@prisma/client';
	import moment from 'moment';

	export let release: Release;
	export let latest: boolean = false;
	export let installed: boolean = false;
</script>

<tr>
	<td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
		<div class="flex items-center gap-x-2">
			{#if release.hidden}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="size-4 text-background-400"
				>
					<path
						fill-rule="evenodd"
						d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
						clip-rule="evenodd"
					/>
					<path
						d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z"
					/>
				</svg>
			{/if}
			<div
				class="truncate text-sm font-medium leading-6"
				class:text-background-400={release.hidden}
				class:text-white={!release.hidden}
			>
				{release.name || `Release ${release.version}`}
			</div>
		</div>
	</td>
	<td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
		<div class="flex gap-x-3">
			<div class="font-mono text-sm leading-6 text-background-400">{release.version}</div>
			{#if latest}
				<span
					class="inline-flex items-center rounded-xl bg-green-400/10 px-2 py-1 text-xs text-green-400 ring-1 ring-inset ring-green-400/20"
					>latest</span
				>
			{/if}
			{#if installed}
				<span
					class="inline-flex items-center rounded-xl bg-blue-400/10 px-2 py-1 text-xs text-blue-400 ring-1 ring-inset ring-blue-400/20"
					>installed</span
				>
			{/if}
			{#if release.prerelease}
				<span
					class="inline-flex items-center rounded-xl bg-background-400/10 px-2 py-1 text-xs text-background-400 ring-1 ring-inset ring-background-400/20"
					>pre-release</span
				>
			{/if}
		</div>
	</td>
	<td
		class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-background-400 sm:table-cell sm:pr-6 lg:pr-8"
	>
		<time
			datetime={release.publishedAt?.toISOString()}
			title={moment(release.publishedAt).format('LLL')}
			>{moment(release.publishedAt).fromNow()}</time
		>
	</td>
</tr>
