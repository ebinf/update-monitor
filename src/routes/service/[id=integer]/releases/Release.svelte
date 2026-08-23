<script lang="ts">
	import type { Release } from '$prisma/client';
	import moment from 'moment';

	interface Props {
		release: Release;
		latest?: boolean;
		installed?: boolean;
	}

	let { release, latest = false, installed = false }: Props = $props();
</script>

<tr>
	<td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
		<div class="flex items-center gap-x-2">
			{#if release.hidden}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="text-background-400 size-4"
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
				class="truncate text-sm leading-6 font-medium"
				class:text-background-400={release.hidden}
				class:text-white={!release.hidden}
			>
				{release.name || `Release ${release.version}`}
			</div>
		</div>
	</td>
	<td class="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
		<div class="flex gap-x-3">
			<div class="text-background-400 font-mono text-sm leading-6">{release.version}</div>
			{#if latest}
				<span
					class="inline-flex items-center rounded-xl bg-green-400/10 px-2 py-1 text-xs text-green-400 ring-1 ring-green-400/20 ring-inset"
					>latest</span
				>
			{/if}
			{#if installed}
				<span
					class="inline-flex items-center rounded-xl bg-blue-400/10 px-2 py-1 text-xs text-blue-400 ring-1 ring-blue-400/20 ring-inset"
					>installed</span
				>
			{/if}
			{#if release.prerelease}
				<span
					class="bg-background-400/10 text-background-400 ring-background-400/20 inline-flex items-center rounded-xl px-2 py-1 text-xs ring-1 ring-inset"
					>pre-release</span
				>
			{/if}
		</div>
	</td>
	<td
		class="text-background-400 hidden py-4 pr-4 pl-0 text-right text-sm leading-6 sm:table-cell sm:pr-6 lg:pr-8"
	>
		<time
			datetime={release.publishedAt?.toISOString()}
			title={moment(release.publishedAt).format('LLL')}
			>{moment(release.publishedAt).fromNow()}</time
		>
	</td>
</tr>
