
<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/buttons/Button.svelte';
	import RecipeDetails from '$lib/components/dialogs/RecipeDetails.svelte';
	import { page } from '$app/state';
	import { preloadData, pushState } from '$app/navigation';
	import RecipePage from './recipes/[recipeID]/+page.svelte';

	let {data} = $props();

	const onSelect = async (e) => {
		e.preventDefault();
		const recipeHref = e.currentTarget

		let pageData = await preloadData(recipeHref);
		console.log(pageData);
		pushState(recipeHref, {selectedRecipe: pageData.data});
	}

</script>

<RecipeDetails recipe={page.state.selectedRecipe?.recipe} closeCallback={
	() => {
		history.back();
	}
}>
	{#if page.state.selectedRecipe}
		<RecipePage data={page.state.selectedRecipe} />
	{/if}
</RecipeDetails>

<div class="flex flex-col gap-2.5">
	<ul class="flex flex-row gap-2.5 items-center justify-center content-center h-screen rounded-2xl flex-wrap">
		{#each data.recipes as recipe (recipe.id)}
			<li>
				<Button style="background-color: {recipe.hexColour}" class="!px-3 group rounded-xl " href="/recipes/{recipe.id}" onclick={(e: Event)=>{onSelect(e)}}>
					<div class="flex flex-col justify-between size-full py-2">
						<div class="self-start flex flex-col justify-start w-full text-left">
							<h2 class="text-lg">{recipe.title}</h2>
							<p class="text-xs text-muted-foreground group-hover:text-foreground-alt transition-colors flex flex-wrap text-start text-pretty font-normal">{recipe.description}</p>
						</div>
						<div class="flex flex-row justify-between w-full">
							<div class="scale-125 origin-bottom-left text-muted-foreground group-hover:text-foreground-alt transition-colors">
							{#if recipe.svgIcon}
								{@html recipe.svgIcon}
							{/if}
						</div>

							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
									 class="lucide lucide-arrow-right text-muted-foreground group-hover:brightness-50 brightness-100 group-hover:translate-x-1 group-hover:-rotate-45 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</div>
					</div>
				</Button>
			</li>
		{/each}
	</ul>

	<form class="flex flex-col gap-3.5 p-4 rounded-2xl" method="POST" use:enhance>
		<input type="text" name="title" placeholder="Recipe Name" />
		<input type="text" name="description" placeholder="Description" />
		<button type="submit">Add Recipe</button>
	</form>
</div>
