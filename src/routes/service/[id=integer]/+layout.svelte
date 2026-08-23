<script lang="ts">
	import LocalProviderLabel from '$lib/LocalProviderLabel.svelte';
	import RemoteProviderLabel from '$lib/RemoteProviderLabel.svelte';
	import StatusLabel from '$lib/StatusLabel.svelte';
	import VersionIcon from '$lib/VersionIcon.svelte';
	import Navbar from './Navbar.svelte';

	let { data, children } = $props();
</script>

<header class="-mt-2">
	<!-- Heading -->
	<div class="border-b border-white/10 bg-background-700/10">
		<div class="flex w-full flex-col divide-y divide-white/5">
			<div class="flex w-full">
				<div
					class="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
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
			<div class="flex w-full">
				<!-- Stats -->
				<div class="mx-auto grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					<div class="border-white/5 px-4 py-6 sm:px-6 lg:px-8">
						<p class="text-sm leading-6 font-medium text-background-400">Remote provider</p>
						<p class="mt-2 flex h-full items-baseline gap-x-2">
							<span class="text-2xl font-semibold tracking-tight text-white"
								><RemoteProviderLabel remote={data.service.remote} /></span
							>
						</p>
					</div>
					<div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 md:border-t-0 lg:px-8">
						<p class="text-sm leading-6 font-medium text-background-400">Local provider</p>
						<p class="mt-2 flex items-baseline gap-x-2">
							<span class="text-2xl font-semibold tracking-tight text-white"
								><LocalProviderLabel remote={data.service.remote} /></span
							>
						</p>
					</div>
					<div class="border-t border-white/5 px-4 py-6 sm:px-6 lg:border-t-0 lg:border-l lg:px-8">
						<p class="text-sm leading-6 font-medium text-background-400">Latest version</p>
						<p class="mt-2 flex items-baseline gap-x-2">
							<span class="text-2xl font-semibold tracking-tight text-white"
								>{data.service?.remote?.latest?.version ?? '–'}</span
							>
						</p>
					</div>
					<div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:border-t-0 lg:px-8">
						<p class="text-sm leading-6 font-medium text-background-400">Installed version</p>
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
	<div class="mt-6 mb-4 border-b border-white/10">
		<div class="mx-auto max-w-7xl">
			<Navbar />
		</div>
	</div>
</header>

<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	{@render children?.()}
</main>
