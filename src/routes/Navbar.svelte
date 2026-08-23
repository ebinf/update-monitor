<script lang="ts">
	import { page } from '$app/state';

	type MenuItem = {
		name: string;
		href: string;
		active?: string[];
	};

	const menuItems: MenuItem[] = [
		{ name: 'Dashboard', href: '/', active: ['/'] },
		{ name: 'Servers', href: '/servers' },
		{
			name: 'Services',
			href: '/services'
		},
		{ name: 'Remotes', href: '/remotes' }
	];

	let mobileMenuOpen: boolean = $state(false);
</script>

<nav class="border-b border-white/5 bg-background-700/10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="mr-2 -ml-2 flex items-center md:hidden">
					<!-- Mobile menu button -->
					<button
						type="button"
						class="relative inline-flex items-center justify-center rounded-md p-2 text-background-400 hover:bg-background-700 hover:text-background-500 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-inset"
						aria-controls="mobile-menu"
						aria-expanded={mobileMenuOpen}
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					>
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Open main menu</span>
						<!--
              Icon when menu is closed.

              Menu open: "hidden", Menu closed: "block"
            -->
						<svg
							class="block h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
						<!--
              Icon when menu is open.

              Menu open: "block", Menu closed: "hidden"
            -->
						<svg
							class="hidden h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="flex shrink-0 items-center">
					<svg
						class="h-8 w-auto"
						xmlns="http://www.w3.org/2000/svg"
						width="55.91735"
						height="54.55752"
						viewBox="0 0 55.91735 54.55752"
					>
						<path
							d="M20.59204,29.58818c-5.03727,.09211-13.24281,.29758-15.31291-5.6623-.63436-1.82633-.14096-4.3927,1.74707-5.34287,1.48062-.74514,3.50794,.05995,3.90609,1.62976,.69568,2.74286,4.91281,2.15213,4.9107-.6646-.00371-4.93822,.02234-12.56512,5.90146-14.27636,2.42208-.705,5.10864-.20143,6.90179,1.63071,1.75255,1.79066,2.43231,4.43792,1.79094,6.84485-.67233,2.52316,2.34798,4.02345,4.17846,2.43237,4.46862-3.88419,12.24315-5.06495,15.49937,.9347,3.33571,6.14611-4.21957,9.84343-8.77921,11.81614-1.23941,.53622-1.51991,2.3553-.89688,3.42047,.74888,1.28034,2.17624,1.43519,3.42047,.89688,5.65866-2.44819,12.45443-6.43865,12.03986-13.57872-.40907-7.04537-6.93619-12.21163-13.82317-11.76913-4.1324,.26551-7.89605,2.04963-10.99597,4.74413l4.17846,2.43237c1.04759-3.93146,.01967-8.11683-2.6128-11.19829C29.8846,.64613,25.55193-.51785,21.45634,.2077c-4.07474,.72185-7.27539,3.68188-8.86592,7.41484-1.59692,3.74796-1.75045,7.90579-1.74742,11.92563l4.9107-.6646c-1.01253-3.9921-5.40705-6.28308-9.32657-5.37608C2.4341,14.4315-.11579,18.62204,.00405,22.56769c.12838,4.22705,3.02328,7.82706,6.64158,9.77278,4.27413,2.29839,9.2185,2.33416,13.94641,2.24771,3.21365-.05877,3.22406-5.05896,0-5h0Z"
							fill="#ea580c90"
							origin="undraw"
						/>
						<g>
							<path
								d="M34.084,52.14258v-18.97109c0-3.21726-5-3.22259-5,0v18.97109c0,3.21726,5,3.22259,5,0h0Z"
								fill="#c2410c"
							/>
							<path
								d="M24.97929,43.52816c1.03844-1.66358,2.15076-3.16053,3.46182-4.59993,.6663-.73152,1.36357-1.4348,2.08998-2.10669,.64627-.59777,1.44291-1.39465,2.10683-1.71354l-1.2618,.34132-.95724-.41024,.26169,.25722c.18814,.22885,.44162,.43406,.65423,.64304,.39254,.38583,.78508,.77165,1.17762,1.15748,.78508,.77165,1.57016,1.5433,2.35524,2.31495,1.57016,1.5433,3.14032,3.0866,4.71047,4.6299,2.29684,2.25755,5.83504-1.27536,3.53553-3.53553-1.91908-1.88626-3.83816-3.77251-5.75725-5.65877-.91593-.90026-1.83185-1.80052-2.74778-2.70078-1.20273-1.18216-2.42043-2.13868-4.19572-1.48196-1.10617,.4092-2.0821,1.42225-2.95479,2.2012-.85479,.76298-1.6717,1.56805-2.44735,2.41136-1.62253,1.76405-3.08001,3.6947-4.34884,5.72737-.71508,1.14555-.24417,2.75308,.89688,3.42047,1.19746,.70039,2.70355,.25163,3.42047-.89688h0Z"
								fill="#c2410c"
							/>
						</g>
					</svg>
				</div>
				<div class="hidden md:ml-6 md:flex md:space-x-8">
					{#each menuItems as item}
						{@const isActive = item.active
							? item.active.includes(page?.route?.id ?? '')
							: page?.url?.pathname.startsWith(item.href)}
						<a
							href={item.href}
							class="inline-flex items-center border-b-2 {isActive
								? 'border-primary-500 text-primary-500'
								: 'border-transparent text-background-400 hover:border-background-300'} px-1 pt-1 text-sm font-medium"
							>{item.name}</a
						>
					{/each}
				</div>
			</div>
			<div class="flex items-center">
				<div class="shrink-0">
					<a
						href="/services/new"
						type="button"
						class="relative inline-flex items-center gap-x-1.5 rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-background-50 shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
					>
						<svg class="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
						New Service
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if mobileMenuOpen}
		<div class="md:hidden" id="mobile-menu">
			<div class="space-y-1 pt-2 pb-3">
				<!-- Current: "bg-primary-50 border-primary-500 text-primary-700", Default: "border-transparent text-background-500 hover:bg-background-50 hover:border-background-300 hover:text-background-700" -->
				{#each menuItems as item}
					{@const isActive = item.active
						? item.active.includes(page?.route?.id ?? '')
						: page?.url?.pathname === item.href}
					<a
						href={item.href}
						class="block border-l-4 {isActive
							? 'border-primary-500 bg-background-800 text-primary-500'
							: 'border-transparent text-background-400 hover:border-background-300 hover:bg-background-800'} py-2 pr-4 pl-3 text-base font-medium"
						>{item.name}</a
					>
				{/each}
			</div>
		</div>
	{/if}
</nav>
