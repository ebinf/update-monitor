<script>
	import ServicesList from './ServicesList.svelte';

	export let data;
</script>

<div class="container mx-auto pt-6">
	<ServicesList services={data.services} />
</div>
