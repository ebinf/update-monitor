<script lang="ts">
	import type { Remote } from '$prisma/client';
	import DockerHub from './providers/DockerHub.svelte';
	import GitHub from './providers/GitHub.svelte';

	interface Props {
		remote?: Remote | Promise<Remote | null> | null;
	}

	let { remote = null }: Props = $props();
</script>

<span class="inline-flex items-baseline">
	{#await remote}
		<span class="mr-1 inline-flex h-5 w-5 animate-pulse rounded-full bg-current opacity-20"></span>
		Loading...
	{:then remote}
		{#if remote}
			{@const config = eval('(' + remote.config + ')')}
			{#if remote.type === 'GitHub'}
				<GitHub />
				{config.owner}/{config.repo}
			{:else if remote.type === 'Docker Hub'}
				<DockerHub />
				{config.namespace}/{config.repo}
			{/if}
		{:else}
			–
		{/if}
	{:catch}
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			class="mr-1 align-middle text-red-600"
			fill="currentColor"
			style="height: 1.2em; width: 1.2em;"
		>
			<path
				fill-rule="evenodd"
				d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
				clip-rule="evenodd"
			/>
		</svg>
		Error
	{/await}
</span>
