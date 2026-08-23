<script lang="ts">
	import ServicesList from './services/ServicesList.svelte';

	let { data } = $props();
</script>

<div class="container mx-auto pt-6">
	<ServicesList services={data.services} heading={'Updates Available'} />
</div>
