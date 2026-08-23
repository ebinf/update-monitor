{#each { length: 5 } as _, i}
	<div
		class="mb-4 flex-auto animate-pulse rounded-md p-3 ring-1 ring-white/5 ring-inset"
		style="opacity: {1 - i / 5};"
	>
		<div class="flex items-center gap-x-3">
			<div class="mb-2 h-4 w-48 rounded-full bg-background-700"></div>
		</div>
		<div class="flex items-center gap-x-2 text-xs leading-5 text-background-800">
			<div class="h-3 w-96 rounded-full bg-background-800"></div>
			<div class="h-1 w-1 rounded-full bg-background-900"></div>
			<div class="h-3 w-96 rounded-full bg-background-800"></div>
		</div>
		<hr class="my-2 border-white/10" />
		<div class="flex flex-col gap-y-2">
			<div class="h-3 w-3/4 rounded-full bg-background-800"></div>
			<div class="h-3 w-5/6 rounded-full bg-background-800"></div>
			<div class="h-3 w-7/8 rounded-full bg-background-800"></div>
			<div class="h-3 w-3/4 rounded-full bg-background-800"></div>
		</div>
	</div>
{/each}
