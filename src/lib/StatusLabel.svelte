<script lang="ts">
	import type { Release } from '@prisma/client';

	export let installed: string | null = null;
	export let latest: Release | Promise<Release | null> | null = null;
</script>

{#await latest then latest}
	{#if latest && installed}
		{#if latest.version === installed}
			<div
				class="flex-none rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20"
			>
				Up to date
			</div>
		{:else}
			<div
				class="flex-none rounded-full bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20"
			>
				Update available
			</div>
		{/if}
	{:else}
		<div
			class="flex-none rounded-full bg-background-400/10 px-2 py-1 text-xs font-medium text-background-400 ring-1 ring-inset ring-background-400/20"
		>
			Unknown
		</div>
	{/if}
{:catch}
	<div
		class="flex-none rounded-full bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20"
	>
		Error
	</div>
{/await}
