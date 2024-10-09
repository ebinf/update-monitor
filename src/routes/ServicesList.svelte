<script lang="ts">
	import { classes } from 'svelte-transition-classes';
	import Service from './Service.svelte';
	import type { Prisma } from '@prisma/client';
	import ServicesSkeleton from './ServicesSkeleton.svelte';

	export let services: Promise<
		Prisma.ServiceGetPayload<{ include: { remote: { include: { latest: true } }; server: true } }>[]
	>;

	let sortDropdownOpen: boolean = false;
	let sortBy: string | undefined;
</script>

<main>
	<header
		class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
	>
		<h1 class="text-base font-semibold leading-7 text-white">Services</h1>

		<div class="relative">
			<button
				type="button"
				class="flex items-center gap-x-1 text-sm leading-6 text-white"
				id="sort-menu-button"
				aria-expanded={sortDropdownOpen}
				aria-haspopup="true"
				class:font-medium={!!sortBy}
				on:click={() => (sortDropdownOpen = !sortDropdownOpen)}
			>
				{#if sortBy}
					{sortBy}
				{:else}
					Sort by
				{/if}
				<svg
					class="h-5 w-5 text-background-500"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>

			{#if sortDropdownOpen}
				<div
					class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-background-800 py-2 shadow-lg ring-1 ring-background-900/5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="sort-menu-button"
					tabindex="-1"
					in:classes={{
						base: 'transition ease-out duration-100',
						from: 'transform opacity-0 scale-95',
						to: 'transform opacity-100 scale-100'
					}}
					out:classes={{
						base: 'transition ease-in duration-75',
						from: 'transform opacity-100 scale-100',
						to: 'transform opacity-0 scale-95'
					}}
				>
					{#each ['Name', 'Date updated', 'Server'] as sortOption}
						<button
							class="block w-full text-left px-3 py-1 text-sm leading-6 text-background-50"
							class:bg-background-700={sortOption === sortBy}
							role="menuitem"
							tabindex="-1"
							on:click={() => {
								sortBy = sortOption;
								sortDropdownOpen = false;
							}}
						>
							{sortOption}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</header>
	<ul role="list" class="divide-y divide-white/5">
		{#await services}
			<ServicesSkeleton />
		{:then services}
			{#each services as service (service.id)}
				<Service {service} />
			{/each}
		{:catch error}
			<p class="text-white">An error occurred: {error.message}</p>
		{/await}
	</ul>
</main>
