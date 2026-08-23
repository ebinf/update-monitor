<div>
	<label for="owner" class="block text-sm/6 font-medium text-white">Owner</label>
	<div class="mt-2">
		<input
			id="owner"
			type="text"
			name="owner"
			placeholder="octocat"
			required
			class="block w-full rounded-md bg-background-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-background-700 placeholder:text-background-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
		/>
	</div>
</div>
<div>
	<label for="repo" class="block text-sm/6 font-medium text-white">Repository</label>
	<div class="mt-2">
		<input
			id="repo"
			type="text"
			name="repo"
			placeholder="Hello-World"
			required
			class="block w-full rounded-md bg-background-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-background-700 placeholder:text-background-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
		/>
	</div>
</div>
<div class="flex gap-3">
	<div class="flex h-6 shrink-0 items-center">
		<div class="group grid size-4 grid-cols-1">
			<input
				id="use-tags"
				type="checkbox"
				name="useTagName"
				checked
				aria-describedby="use-tags-description"
				class="col-start-1 row-start-1 appearance-none rounded-sm border border-white/10 bg-white/5 checked:border-primary-500 checked:bg-primary-500 indeterminate:border-primary-500 indeterminate:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto"
			/>
			<svg
				viewBox="0 0 14 14"
				fill="none"
				class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25"
			>
				<path
					d="M3 8L6 11L11 3.5"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="opacity-0 group-has-checked:opacity-100"
				/>
				<path
					d="M3 7H11"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="opacity-0 group-has-indeterminate:opacity-100"
				/>
			</svg>
		</div>
	</div>
	<div class="text-sm/6">
		<label for="use-tags" class="font-medium text-white"
			>Use the names of the tags instead of the names of the releases</label
		>
		<p id="use-tags-description" class="max-w-2xl text-background-400">
			This is useful for repositories that have differnt naming conventions for tags and releases
			(e. g. the tag name is "1.0.0" but the release name is "Winter Release – Happy New Year!"). In
			most cases, you should leave this option enabled.
		</p>
	</div>
</div>
<div class="flex gap-3">
	<div class="flex h-6 shrink-0 items-center">
		<div class="group grid size-4 grid-cols-1">
			<input
				id="hide-pre-releases"
				type="checkbox"
				name="hidePrereleases"
				checked
				aria-describedby="hide-pre-releases-description"
				class="col-start-1 row-start-1 appearance-none rounded-sm border border-white/10 bg-white/5 checked:border-primary-500 checked:bg-primary-500 indeterminate:border-primary-500 indeterminate:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto"
			/>
			<svg
				viewBox="0 0 14 14"
				fill="none"
				class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25"
			>
				<path
					d="M3 8L6 11L11 3.5"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="opacity-0 group-has-checked:opacity-100"
				/>
				<path
					d="M3 7H11"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="opacity-0 group-has-indeterminate:opacity-100"
				/>
			</svg>
		</div>
	</div>
	<div class="text-sm/6">
		<label for="hide-pre-releases" class="font-medium text-white">Hide pre-releases</label>
		<p id="hide-pre-releases-description" class="max-w-2xl text-background-400">
			Hide all releases that are marked as pre-releases (normally releases that are not yet stable).
			This works additionally to filtering of version numbers you are interested in. In most cases,
			you should leave this option enabled.
		</p>
	</div>
</div>
