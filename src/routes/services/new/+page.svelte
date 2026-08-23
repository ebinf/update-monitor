<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ActionData, PageData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();
</script>

<div class="container mx-auto pt-6">
	<main>
		<header
			class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
		>
			<h1 class="text-base leading-7 font-semibold text-white">New Service</h1>
		</header>

		<div class="mt-6 px-4 sm:px-6 lg:px-8">
			{#if form?.error}
				<div class="rounded-md bg-red-500/15 p-4 outline outline-red-500/25">
					<div class="flex">
						<div class="shrink-0">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								data-slot="icon"
								aria-hidden="true"
								class="size-5 text-red-400"
							>
								<path
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
									clip-rule="evenodd"
									fill-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-200">
								There was an error with your submission
							</h3>
							<div class="mt-2 text-sm text-red-200/80">
								{form.error}
							</div>
						</div>
					</div>
				</div>
			{/if}

			<form method="POST" class="mt-6 space-y-6">
				<div>
					<label for="name" class="block text-sm/6 font-medium text-white">Name</label>
					<div class="mt-2">
						<input
							id="name"
							type="text"
							name="name"
							required
							placeholder="My Service"
							class="block w-full rounded-md bg-background-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-background-700 placeholder:text-background-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
						/>
					</div>
				</div>
				<div>
					<label for="server" class="block text-sm/6 font-medium text-white">Server</label>
					<div class="mt-2 flex flex-row gap-x-2">
						<select
							id="server"
							name="server"
							required
							class="block w-full rounded-md bg-background-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-background-700 placeholder:text-background-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
						>
							<option value="" selected disabled>Select a server</option>

							{#each data.servers as server}
								<option value={server.id}>
									{server.name}
								</option>
							{/each}
						</select>
						<a
							href={resolve('/servers/new')}
							class="flex items-center gap-x-2 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="size-5"
							>
								<path
									d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
								/>
							</svg>

							New
						</a>
					</div>
				</div>
				<div>
					<label for="remote" class="block text-sm/6 font-medium text-white">Remote</label>
					<div class="mt-2 flex flex-row gap-x-2">
						<select
							id="remote"
							name="remote"
							required
							class="block w-full rounded-md bg-background-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-background-700 placeholder:text-background-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
						>
							<option value="" selected disabled>Select a remote</option>

							{#each new Set(data.remotes.map((r) => r.type)) as type}
								<optgroup label={type}>
									{#each data.remotes as remote}
										<option value={remote.id}>
											{remote.name}
										</option>
									{/each}
								</optgroup>
							{/each}
						</select>
						<a
							href={resolve('/remotes/new')}
							class="flex items-center gap-x-2 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="size-5"
							>
								<path
									d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
								/>
							</svg>

							New
						</a>
					</div>
				</div>
				<div class="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						class="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	</main>
</div>
