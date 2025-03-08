
<script lang="ts">
	import type { Recipes } from '$lib/server/db/schema';
	import Button from '$lib/components/buttons/Button.svelte';
	import RecipeEditor from '$lib/components/dialogs/RecipeEditor.svelte';
	import RecipeDeletion from '$lib/components/dialogs/RecipeDeletion.svelte';

	interface Props {
		data: {
			recipes: typeof Recipes.$inferSelect[];
		}
	}

	let {data}: Props = $props();
	let selectedRecipe = $state<typeof Recipes.$inferSelect | null>(null);
	let isOpen = $state(false);

</script>

<RecipeEditor {selectedRecipe} bind:isOpen={isOpen} />

<div class="flex flex-col p-8 gap-4 size-full items-center content-center">
	<h1 class="text-3xl">Editor</h1>

<!-- List of recipes	-->
	<div class="flex flex-col gap-1.5 md:max-w-96 w-full">
		{#each data.recipes as recipe (recipe.id)}
			<Button class="justify-start cursor-pointer" onclick={() => {
				selectedRecipe = recipe;
			}}>
				<div class="flex flex-row justify-between w-full items-center">
					{recipe.title}
					<div class="flex flex-row gap-2.5 font-normal text-sm items-center">
						<p class="text-muted-foreground">{recipe.steps?.length} steps</p>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
						<RecipeDeletion recipe={recipe} />
					</div>
				</div>
			</Button>
		{/each}
		<Button class="justify-start !bg-emerald-400 cursor-pointer" onclick={() => {
			selectedRecipe = null;
			isOpen = true;
		}}>
			<div class="flex flex-row justify-between w-full items-center">
				New Recipe
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M12 5v14M5 12h14"/></svg>
			</div>
		</Button>

	</div>
</div>