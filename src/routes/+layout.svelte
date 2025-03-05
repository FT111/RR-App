<script lang="ts">
	import '../app.css';
	import { Button } from 'bits-ui';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();

	const menuItems = [
		{
			title: 'Drinks',
			href: '/',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>\n'
		},
		{
			title: 'Editor',
			href: '/recipes/editor',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>'
		}
	]

	let selectedItem = $derived(page.url.pathname);
</script>

<nav class="h-1/12 p-4 flex flex sticky top-0 gap-3 items-center w-full bg-background">
	<h2 class="text-xl font-medium tracking-tight">Drink Recipes</h2>
	<div class="flex flex-row gap-1.5">
		{#each menuItems as item (item.title)}
		<Button.Root href={`${item.href}`} class="{selectedItem === item.href && 'bg-slate-200'}
																	text-primary items-center rounded-3xl min-w-16 bg-slate-100
		 															transition-all hover:bg-slate-200 flex-row flex gap-1.5 p-2 px-3.5 ">
<!--	Render page icon		-->
			{@html item.icon}
			<p>
				{item.title}
			</p>
		</Button.Root>
		{/each}

	</div>
</nav>


{@render children()}
