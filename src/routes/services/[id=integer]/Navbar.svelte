<script lang="ts">
	import { page } from '$app/state';

	type MenuItem = {
		name: string;
		href: string;
		active?: string[];
	};

	const menuItems: MenuItem[] = [
		{ name: 'Overview', href: 'overview', active: ['/services/[id=integer]/overview'] },
		{
			name: 'Releases',
			href: 'releases',
			active: ['/services/[id=integer]/releases']
		},
		{ name: 'Changelog', href: 'changelog', active: ['/services/[id=integer]/changelog'] },
		{
			name: 'Documentation',
			href: 'documentation',
			active: ['/services/[id=integer]/documentation']
		},
		{ name: 'Settings', href: 'settings', active: ['/services/[id=integer]/settings'] }
	];
</script>

<nav class="flex overflow-x-auto py-4">
	<ul
		role="list"
		class="flex min-w-full flex-none gap-x-6 px-4 text-sm leading-6 font-semibold text-background-400 sm:px-6 lg:px-8"
	>
		{#each menuItems as item}
			{@const isActive = item.active
				? item.active.includes(page?.route?.id ?? '')
				: page?.url?.pathname === item.href}
			<li>
				<a href={item.href} class:text-primary-400={isActive}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>
