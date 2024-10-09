<script lang="ts">
	import { page } from '$app/stores';

	type MenuItem = {
		name: string;
		href: string;
		active?: string[];
	};

	const menuItems: MenuItem[] = [
		{ name: 'Overview', href: 'overview', active: ['/service/[id=integer]'] },
		{
			name: 'Releases',
			href: 'releases',
			active: ['/service/[id=integer]/releases']
		},
		{ name: 'Changelog', href: '#' },
		{ name: 'Documentation', href: '#' },
		{ name: 'Settings', href: '#' }
	];
</script>

<nav class="flex overflow-x-auto py-4">
	<ul
		role="list"
		class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-background-400 sm:px-6 lg:px-8"
	>
		{#each menuItems as item}
			{@const isActive = item.active
				? item.active.includes($page?.route?.id ?? '')
				: $page?.url?.pathname === item.href}
			<li>
				<a href={item.href} class:text-primary-400={isActive}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>
