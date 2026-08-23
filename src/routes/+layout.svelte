<script lang="ts">
	import './layout.css';
	import Navbar from './Navbar.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Navbar />
<main class="mx-auto mt-2">
	{@render children?.()}
</main>
