{#each { length: 5 } as _, i}
	<tr style="opacity: {1 - i / 5};">
		<td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
			<div class="flex items-center gap-x-4">
				<div class="bg-background-700 animate-pulse my-2 h-2 w-64 rounded"></div>
			</div>
		</td>
		<td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
			<div class="flex gap-x-3">
				<div class="bg-background-700 animate-pulse my-2 h-2 w-12 rounded"></div>
			</div>
		</td>
		<td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-6 lg:pr-8">
			<div class="bg-background-700 animate-pulse my-2 h-2 w-20 rounded ml-auto"></div>
		</td>
	</tr>
{/each}
