
<script lang="ts">
  import IngredientBadge from '$lib/components/badges/Ingredient.svelte';
  import type { Recipes } from '$lib/server/db/schema';
	import { Tooltip } from 'bits-ui';

	interface Props {
		data: {
			recipe?: typeof Recipes.$inferSelect;
		};
		dialogView: boolean;
	}

	let { data, dialogView = false }: Props = $props()
</script>

<div class={`flex flex-col gap-2.5 ${dialogView || 'p-8 size-full items-center content-center'}`}>
	<h2 class={`${dialogView && 'hidden'} text-center w-full text-3xl flex flex-row gap-1.5 items-center justify-center`}>
		{@html data.recipe?.svgIcon}
		{data.recipe?.title}
	</h2>

	<p>
		{data.recipe?.description}
	</p>

	<div class="flex flex-row flex-wrap gap-1 w-full {dialogView || 'justify-center'}">
		{#snippet badgeSnippet()}
		<div class="text-foreground-alt">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-carrot"><path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"/><path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z"/><path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z"/></svg>
		</div>
		{/snippet}

		<!-- Placeholder badge to show start of list -->
		<IngredientBadge ingredient={{name: 'Ingredients', required: true}} snippet={badgeSnippet}
						class="bg-slate-100" />

		{#each data.recipe?.ingredients as ingredient}
			{#if !ingredient.required}
				<IngredientBadge ingredient={ingredient} class="bg-slate-200"/>
			{:else}
				<IngredientBadge ingredient={ingredient} style="background-color: {data.recipe?.hexColour}" />
			{/if}
		{/each}

	</div>

	<div class="flex flex-col gap-2 p-1 {dialogView ? 'w-full' : 'md:w-96 w-full'}">
		{#each data.recipe?.steps as step (step.id)}
			<div class="flex flex-row gap-2.5 items-center justify-start content-center h-10 bg-slate-100 rounded-xl p-2.5">
				<div class="flex flex-row gap-2 items-center text-muted-foreground justify-start w-full text-left">
					{step.position+1}
					<p class="text-xs text-foreground-alt flex flex-wrap text-start text-pretty font-normal">{
						step.description
					}</p>
				</div>
			</div>
		{/each}
		<div class="flex flex-row gap-2.5 items-center justify-start h-10 content-center bg-emerald-500 rounded-xl p-2.5">
			<div class="flex flex-row gap-2 items-center text-muted-foreground justify-start w-full text-left">
				<p class="text-xs text-white flex flex-wrap text-start text-pretty font-normal">
					Done!
				</p>
			</div>
		</div>
	</div>
</div>