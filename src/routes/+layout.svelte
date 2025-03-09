<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();

	const menuItems = [
		{
			title: 'Recipes',
			href: '/',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>\n'
		},
		{
			title: 'Editor',
			href: '/recipes/editor',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>'
		},
		{
			title: 'Repo',
			href: 'https://github.com/FT111/RR-App',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>'
		}
	]

	let selectedItem = $derived(page.url.pathname);
</script>

<nav class="h-1/12 p-4 flex flex sticky top-0 gap-3 items-center w-full bg-background">
	<h2 class="text-xl font-medium tracking-tight">Recipes</h2>
	<div class="flex flex-row gap-1.5">
		{#each menuItems as item (item.title)}
		<a href={`${item.href}`} class="{selectedItem === item.href && 'bg-slate-200'}
																	text-primary items-center rounded-3xl min-w-16 bg-slate-100
		 															transition-all hover:bg-slate-200 flex-row flex gap-1.5 p-2 px-3.5 ">
<!--	Render page icon		-->
			<img src='data:image/svg+xml,{item.icon}' alt={item.title} />
			<p>
				{item.title}
			</p>
		</a>
		{/each}

	</div>
</nav>


{@render children()}
