<script lang="ts">
	import ServicesList from './services/ServicesList.svelte';
	import UpToDate from './UpToDate.svelte';

	let { data } = $props();
</script>

<div class="container mx-auto pt-6">
	<ServicesList services={data.services} heading={'Updates Available'}>
		<UpToDate />
	</ServicesList>
</div>
