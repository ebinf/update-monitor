<script lang="ts">
	import type { Release } from '$prisma/client';
	import moment from 'moment';
	import { setInstalled } from './setInstalled.remote';
	import { invalidateAll } from '$app/navigation';

	interface Props {
		release: Release;
		latest?: boolean;
		installed?: boolean;
		manualLocal?: boolean;
	}

	let { release, latest = false, installed = false, manualLocal = true }: Props = $props();
</script>

<tr
	class={{
		group: true,
		'bg-background-700/15 hover:bg-background-600/15': release.hidden,
		'bg-blue-500/5 hover:bg-blue-500/10': installed,
		'bg-green-500/5 hover:bg-green-500/10': latest,
		'hover:bg-white/5': !release.hidden && !installed && !latest
	}}
>
	<td class="max-w-96 py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
		<div
			class="flex items-center gap-x-2 text-wrap whitespace-break-spaces"
			title={release.name || `Release ${release.version}`}
		>
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
				class="truncate text-sm leading-6 font-medium"
				class:text-background-400={release.hidden}
				class:text-white={!release.hidden}
			>
				{release.name || `Release ${release.version}`}
			</div>
		</div>
	</td>
	<td class="py-4 pr-4 pl-0 text-wrap whitespace-break-spaces sm:pr-8">
		<div class="flex gap-x-3">
			<div class="font-mono text-sm leading-6 text-background-400" title={release.remoteVersion}>
				{release.version}
			</div>
			{#if latest}
				<span
					class="inline-flex items-center self-center rounded-xl bg-green-400/10 px-2 py-1 text-xs text-green-400 ring-1 ring-green-400/20 ring-inset"
					>latest</span
				>
			{/if}
			{#if installed}
				<span
					class="inline-flex items-center self-center rounded-xl bg-blue-400/10 px-2 py-1 text-xs text-blue-400 ring-1 ring-blue-400/20 ring-inset"
					>installed</span
				>
			{/if}
			{#if release.prerelease}
				<span
					class="inline-flex items-center self-center rounded-xl bg-background-400/10 px-2 py-1 text-xs text-background-400 ring-1 ring-background-400/20 ring-inset"
					>pre-release</span
				>
			{/if}
		</div>
	</td>
	<td class="py-4 pr-8 pl-0 text-right text-sm leading-6 text-background-400 sm:pr-6 lg:pr-8">
		<time
			datetime={release.publishedAt?.toISOString()}
			title={moment(release.publishedAt).format('LLL')}
			>{moment(release.publishedAt).fromNow()}</time
		>
	</td>
	<td class="w-56 py-0 pr-4 pl-0">
		{#if !installed && manualLocal}
			<button
				class="invisible rounded p-1 text-background-600 group-hover:visible hover:bg-white/15 hover:text-white"
				title="Set as installed"
				onclick={async () => {
					await setInstalled({ release: release.id });
					invalidateAll();
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="size-5"
				>
					<path
						fill-rule="evenodd"
						d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="sr-only">Set as installed</span>
			</button>
		{/if}
	</td>
</tr>
