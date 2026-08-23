<script lang="ts">
	import type { Release } from '$prisma/client';

	interface Props {
		installed?: string | null;
		latest?: Release | Promise<Release | null> | null;
	}

	let { installed = null, latest = null }: Props = $props();
</script>

{#await latest then latest}
	{#if latest && installed}
		{#if latest.version === installed}
			<div
				class="flex-none rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-green-400/20 ring-inset"
			>
				Up to date
			</div>
		{:else}
			<div
				class="flex-none rounded-full bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-yellow-400/20 ring-inset"
			>
				Update available
			</div>
		{/if}
	{:else}
		<div
			class="bg-background-400/10 text-background-400 ring-background-400/20 flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
		>
			Unknown
		</div>
	{/if}
{:catch}
	<div
		class="flex-none rounded-full bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-red-400/20 ring-inset"
	>
		Error
	</div>
{/await}
