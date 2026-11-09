<script lang="ts">
	import { refreshAll } from '$app/navigation';
	import ServicesList from './ServicesList.svelte';
	import { updateAll } from './update.remote.js';

	let { data } = $props();

	let reloading = $state(false);
</script>

<div class="container mx-auto pt-6">
	<button
		type="button"
		disabled={reloading}
		class="mb-4 flex items-center rounded-md bg-background-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-background-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
		onclick={async () => {
			reloading = true;
			await updateAll();
			await refreshAll();
			await new Promise((resolve) => setTimeout(resolve, 5000));
			reloading = false;
		}}
	>
		{#if reloading}
			<svg
				class="mr-2 -ml-1 size-5 animate-spin"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			Updating...
		{:else}
			Update All
		{/if}
	</button>
	<ServicesList services={data.services} />
</div>
