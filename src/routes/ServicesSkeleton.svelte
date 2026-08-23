{#each { length: 5 } as _, i}
	<li
		class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
		style="opacity: {1 - i / 5};"
	>
		<div class="min-w-0 flex-auto">
			<div class="flex items-center gap-x-3">
				<div
					class="flex-none animate-pulse rounded-full bg-background-100/5 p-1 text-background-700"
				>
					<div class="h-2 w-2 rounded-full bg-current"></div>
				</div>
				<div class="my-2 h-2 w-56 animate-pulse rounded bg-background-700"></div>
			</div>
			<div
				class="mt-3 flex animate-pulse items-center gap-x-2.5 text-xs leading-5 text-background-400"
			>
				<div class="my-2 h-1 w-48 rounded bg-background-700"></div>
				<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-background-700">
					<circle cx="1" cy="1" r="1" />
				</svg>
				<div class="my-2 h-1 w-32 rounded bg-background-700"></div>
			</div>
		</div>
		<div
			class="h-7 w-16 flex-none animate-pulse rounded-full bg-background-700/10 px-2 py-1 text-xs font-medium ring-1 ring-background-700/20 ring-inset"
		></div>
		<svg
			class="h-5 w-5 flex-none animate-pulse text-background-700"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
				clip-rule="evenodd"
			/>
		</svg>
	</li>
{/each}
