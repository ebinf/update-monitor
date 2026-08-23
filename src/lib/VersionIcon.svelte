<script lang="ts">
	import type { Release } from '$prisma/client';

	interface Props {
		installed?: string | null;
		latest?: Release | Promise<Release | null> | null;
	}

	let { installed = null, latest = null }: Props = $props();
</script>

{#await latest}
	<div
		class="bg-background-100/10 text-background-500 flex-none animate-ping rounded-full p-1"
		title="Loading..."
	>
		<div class="h-2 w-2 rounded-full bg-current"></div>
	</div>
{:then latest}
	{#if latest && installed}
		<div
			class="flex-none rounded-full p-1 {latest.version === installed
				? 'bg-green-400/10 text-green-400'
				: 'bg-yellow-400/10 text-yellow-400'}"
			title={latest.version === installed ? 'Up to date' : 'Update available'}
		>
			<div class="h-2 w-2 rounded-full bg-current"></div>
		</div>
	{:else}
		<div
			class="bg-background-100/10 text-background-500 flex-none rounded-full p-1"
			title="Unknown"
		>
			<div class="h-2 w-2 rounded-full bg-current"></div>
		</div>
	{/if}
{:catch}
	<div class="flex-none rounded-full bg-rose-400/10 p-1 text-rose-400" title="Error">
		<div class="h-2 w-2 rounded-full bg-current"></div>
	</div>
{/await}
