<script lang="ts">
	import DockerHub from '$lib/providers/DockerHub.svelte';
	import GitHub from '$lib/providers/GitHub.svelte';
	import type { ActionData, PageData } from './$types';
	import DockerHubForm from './DockerHubForm.svelte';
	import GitHubForm from './GitHubForm.svelte';

	interface Props {
		form: ActionData;
		data: PageData;
	}

	let { form, data }: Props = $props();

	let selectedProvider = $state(null);
</script>

<div class="container mx-auto pt-6">
	<main>
		<header
			class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
		>
			<h1 class="text-base leading-7 font-semibold text-white">New Remote</h1>
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
							{#if form.messages}
								<div class="mt-2 text-sm text-red-200/80">
									<ul class="list-disc pl-5">
										{#each form.messages as message}
											<li>{message.message}</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			<form method="POST" class="mt-6 space-y-6">
				<div>
					<fieldset>
						<legend class="text-sm/6 font-semibold text-white">Provider</legend>
						<div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
							{#each data.providers as provider (provider.name)}
								<label
									aria-label={provider.name}
									class="group relative flex rounded-lg border border-white/10 bg-background-800/50 p-4 has-checked:bg-primary-500/10 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-primary-500 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:bg-background-800 has-disabled:opacity-25"
								>
									<input
										type="radio"
										name="provider"
										value={provider.name}
										disabled={!provider.enabled}
										bind:group={selectedProvider}
										class="absolute inset-0 hidden appearance-none focus:outline-none"
									/>
									<div class="flex-1">
										<span class="block text-sm font-medium text-white">
											{#if provider.name === 'GitHub'}
												<GitHub />
											{:else if provider.name === 'Docker Hub'}
												<DockerHub />
											{/if}
											{provider.name}
										</span>
										<span class="mt-1 block text-sm text-background-400"
											>{provider.description}</span
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
							{/each}
						</div>
					</fieldset>
				</div>

				{#if selectedProvider === 'GitHub'}
					<GitHubForm />
				{:else if selectedProvider === 'Docker Hub'}
					<DockerHubForm />
				{/if}

				<div class="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						disabled={!selectedProvider}
						class="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-45"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	</main>
</div>
