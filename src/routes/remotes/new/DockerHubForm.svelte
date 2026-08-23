<script lang="ts">
	let mode = $state('recent');
</script>

<div>
	<label for="namespace" class="block text-sm/6 font-medium text-white">Namespace</label>
	<div class="mt-2">
		<input
			id="namespace"
			type="text"
			name="namespace"
			placeholder="_"
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
			placeholder="nginx"
			required
			class="block w-full rounded-md bg-background-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-background-700 placeholder:text-background-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
		/>
	</div>
</div>
<div>
	<fieldset>
		<legend class="text-sm/6 font-semibold text-white">Mode</legend>
		<div class="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
			<label
				aria-label="Most recent"
				class="group relative flex rounded-lg border border-white/10 bg-background-800/50 p-4 has-checked:bg-primary-500/10 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-primary-500 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:bg-background-800 has-disabled:opacity-25"
			>
				<input
					type="radio"
					name="mode"
					value="recent"
					bind:group={mode}
					class="absolute inset-0 hidden appearance-none focus:outline-none"
				/>
				<div class="flex-1">
					<span class="flex items-center gap-x-1.5 text-sm font-medium text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="size-4"
						>
							<path
								fill-rule="evenodd"
								d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
								clip-rule="evenodd"
							/>
						</svg>

						Most recent
					</span>
					<span class="mt-1 block text-sm text-background-400"
						>Assume the most recent image is the latest. This works for small repositories where
						you'd want to update on every push.</span
					>
				</div>
				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					data-slot="icon"
					aria-hidden="true"
					class="invisible size-5 text-primary-500 group-has-checked:visible"
				>
					<path
						d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg>
			</label>
			<label
				aria-label="With tag"
				class="group relative flex rounded-lg border border-white/10 bg-background-800/50 p-4 has-checked:bg-primary-500/10 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-primary-500 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:bg-background-800 has-disabled:opacity-25"
			>
				<input
					type="radio"
					name="mode"
					value="withTag"
					bind:group={mode}
					class="absolute inset-0 hidden appearance-none focus:outline-none"
				/>
				<div class="flex-1">
					<span class="flex items-center gap-x-1.5 text-sm font-medium text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="size-4"
						>
							<path
								fill-rule="evenodd"
								d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
								clip-rule="evenodd"
							/>
						</svg>

						With tag
					</span>
					<span class="mt-1 block text-sm text-background-400">
						Assume the latest version is the one sharing the specified tag. This works best for
						repositories where you'd want to follow a "latest" tag or another tag indicating updates
						you are interedted in.
					</span>
				</div>
				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					data-slot="icon"
					aria-hidden="true"
					class="invisible size-5 text-primary-500 group-has-checked:visible"
				>
					<path
						d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg>
			</label>
		</div>
	</fieldset>
</div>
{#if mode === 'withTag'}
	<div>
		<label for="latestTag" class="block text-sm/6 font-medium text-white">Tag</label>
		<div class="mt-2">
			<input
				id="latestTag"
				type="text"
				name="latestTag"
				placeholder="latest"
				required
				class="block w-full rounded-md bg-background-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-background-700 placeholder:text-background-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
			/>
		</div>
	</div>
{/if}
