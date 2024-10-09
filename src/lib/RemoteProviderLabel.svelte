<script lang="ts">
	import type { Remote } from '@prisma/client';

	export let remote: Remote | Promise<Remote | null> | null = null;
</script>

<span class="inline-flex items-baseline">
	{#await remote}
		<span class="animate-pulse inline-flex h-5 w-5 rounded-full bg-current opacity-20 mr-1"></span>
		Loading...
	{:then remote}
		{#if remote}
			{@const config = eval('(' + remote.config + ')')}
			{#if remote.type === 'GitHub'}
				<svg
					viewBox="0 0 24 24"
					aria-hidden="true"
					class="mr-1 inline-flex self-center"
					fill="currentColor"
					style="height: 1.1em; width: 1.1em;"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						fill="currentColor"
						d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
					></path>
				</svg>
				{config.owner}/{config.repo}
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
