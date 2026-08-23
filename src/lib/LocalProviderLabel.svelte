<script lang="ts">
	import type { Remote } from '$prisma/client';

	interface Props {
		local?: Remote | Promise<Remote | null> | null;
	}

	let { local = null }: Props = $props();
</script>

<span>
	{#await local}
		<span class="mr-1 inline-flex h-5 w-5 animate-pulse rounded-full bg-current opacity-20"></span>
		Loading...
	{:then local}
		{#if local}
			Unknown
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="mr-1 inline size-6"
			>
				<path
					fill-rule="evenodd"
					d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
					clip-rule="evenodd"
				/>
			</svg>

			Manual
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
