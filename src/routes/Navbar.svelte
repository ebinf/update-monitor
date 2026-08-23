<script lang="ts">
	import { page } from '$app/state';

	type MenuItem = {
		name: string;
		href: string;
		active?: string[];
	};

	const menuItems: MenuItem[] = [
		{ name: 'Dashboard', href: '/' },
		{ name: 'Servers', href: '#' },
		{
			name: 'Services',
			href: '#',
			active: ['/service/[id=integer]', '/service/[id=integer]/releases']
		},
		{ name: 'Remotes', href: '#' }
	];
</script>

<nav class="bg-background-700/10 border-b border-white/5">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="mr-2 -ml-2 flex items-center md:hidden">
					<!-- Mobile menu button -->
					<button
						type="button"
						class="text-background-400 hover:bg-background-100 hover:text-background-500 focus:ring-primary-500 relative inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-none focus:ring-inset"
						aria-controls="mobile-menu"
						aria-expanded="false"
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
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
						alt="Your Company"
					/>
				</div>
				<div class="hidden md:ml-6 md:flex md:space-x-8">
					{#each menuItems as item}
						{@const isActive = item.active
							? item.active.includes(page?.route?.id ?? '')
							: page?.url?.pathname === item.href}
						<a
							href={item.href}
							class="inline-flex items-center border-b-2 {isActive
								? 'border-primary-500 text-primary-500'
								: 'text-background-400 hover:border-background-300 border-transparent'} px-1 pt-1 text-sm font-medium"
							>{item.name}</a
						>
					{/each}
				</div>
			</div>
			<div class="flex items-center">
				<div class="shrink-0">
					<button
						type="button"
						class="bg-primary-700 text-background-50 hover:bg-primary-500 focus-visible:outline-primary-600 relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						<svg class="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
						New Service
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="md:hidden" id="mobile-menu">
		<div class="space-y-1 pt-2 pb-3">
			<!-- Current: "bg-primary-50 border-primary-500 text-primary-700", Default: "border-transparent text-background-500 hover:bg-background-50 hover:border-background-300 hover:text-background-700" -->
			<a
				href="#"
				class="border-primary-500 bg-primary-50 text-primary-700 block border-l-4 py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5"
				>Dashboard</a
			>
			<a
				href="#"
				class="text-background-500 hover:border-background-300 hover:bg-background-50 hover:text-background-700 block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5"
				>Team</a
			>
			<a
				href="#"
				class="text-background-500 hover:border-background-300 hover:bg-background-50 hover:text-background-700 block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5"
				>Projects</a
			>
			<a
				href="#"
				class="text-background-500 hover:border-background-300 hover:bg-background-50 hover:text-background-700 block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5"
				>Calendar</a
			>
		</div>
		<div class="border-background-200 border-t pt-4 pb-3">
			<div class="flex items-center px-4 sm:px-6">
				<div class="shrink-0">
					<img
						class="h-10 w-10 rounded-full"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</div>
				<div class="ml-3">
					<div class="text-background-800 text-base font-medium">Tom Cook</div>
					<div class="text-background-500 text-sm font-medium">tom@example.com</div>
				</div>
				<button
					type="button"
					class="text-background-400 hover:text-background-500 focus:ring-primary-500 relative ml-auto shrink-0 rounded-full bg-white p-1 focus:ring-2 focus:ring-offset-2 focus:outline-none"
				>
					<span class="absolute -inset-1.5"></span>
					<span class="sr-only">View notifications</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</button>
			</div>
			<div class="mt-3 space-y-1">
				<a
					href="#"
					class="text-background-500 hover:bg-background-100 hover:text-background-800 block px-4 py-2 text-base font-medium sm:px-6"
					>Your Profile</a
				>
				<a
					href="#"
					class="text-background-500 hover:bg-background-100 hover:text-background-800 block px-4 py-2 text-base font-medium sm:px-6"
					>Settings</a
				>
				<a
					href="#"
					class="text-background-500 hover:bg-background-100 hover:text-background-800 block px-4 py-2 text-base font-medium sm:px-6"
					>Sign out</a
				>
			</div>
		</div>
	</div>
</nav>
