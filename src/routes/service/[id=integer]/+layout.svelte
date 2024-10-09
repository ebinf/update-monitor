<script lang="ts">
	import LocalProviderLabel from '$lib/LocalProviderLabel.svelte';
	import RemoteProviderLabel from '$lib/RemoteProviderLabel.svelte';
	import StatusLabel from '$lib/StatusLabel.svelte';
	import VersionIcon from '$lib/VersionIcon.svelte';
	import Navbar from './Navbar.svelte';

	export let data;
</script>

<header>
	<!-- Heading -->
	<div class="border-b border-t border-white/10 bg-background-700/10">
		<div class="divide-white/5 grid grid-rows-2 divide-y w-full">
			<div class="w-full flex">
				<div
					class="max-w-7xl mx-auto w-full flex flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
				>
					<div>
						<div class="flex items-center gap-x-3">
							<VersionIcon
								latest={data.service.remote?.latest}
								installed={data.service.installedVersion}
							/>
							<h1 class="flex gap-x-3 text-base leading-7">
								<span class="font-semibold text-white">{data.service.server.name}</span>
								<span class="text-background-600">/</span>
								<span class="font-semibold text-white">{data.service.name}</span>
							</h1>
						</div>
						<p class="mt-2 text-xs leading-6 text-background-400">
							Deploys from GitHub via main branch
						</p>
					</div>
					<StatusLabel
						installed={data.service.installedVersion}
						latest={data.service.remote?.latest}
					/>
				</div>
			</div>
			<div class="w-full flex">
				<!-- Stats -->
				<div class="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					<div class="border-white/5 px-4 py-6 sm:px-6 lg:px-8">
						<p class="text-sm font-medium leading-6 text-background-400">Remote provider</p>
						<p class="mt-2 flex items-baseline h-full gap-x-2">
							<span class="text-2xl font-semibold tracking-tight text-white"
								><RemoteProviderLabel remote={data.service.remote} /></span
							>
						</p>
					</div>
					<div class="border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
						<p class="text-sm font-medium leading-6 text-background-400">Local provider</p>
						<p class="mt-2 flex items-baseline gap-x-2">
							<span class="text-2xl font-semibold tracking-tight text-white"
								><LocalProviderLabel remote={data.service.remote} /></span
							>
						</p>
					</div>
					<div class="border-white/5 px-4 py-6 lg:border-l sm:px-6 lg:px-8">
						<p class="text-sm font-medium leading-6 text-background-400">Latest version</p>
						<p class="mt-2 flex items-baseline gap-x-2">
							<span class="text-2xl font-semibold tracking-tight text-white"
								>{data.service?.remote?.latest?.version ?? '–'}</span
							>
						</p>
					</div>
					<div class="border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
						<p class="text-sm font-medium leading-6 text-background-400">Installed version</p>
						<p class="mt-2 flex items-baseline gap-x-2">
							<span class="text-2xl font-semibold tracking-tight text-white"
								>{data.service.installedVersion ?? '–'}</span
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Secondary navigation -->
	<div class="border-b border-white/10 mb-4 mt-6">
		<div class="max-w-7xl mx-auto">
			<Navbar />
		</div>
	</div>
</header>

<main class="mx-auto max-w-7xl">
	<slot />
</main>
