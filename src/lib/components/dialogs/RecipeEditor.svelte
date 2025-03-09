<script lang="ts">
	import type { Recipes } from '$lib/server/db/schema';
	import { Dialog, Separator } from 'bits-ui';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { crossfade } from 'svelte/transition';
	import { backInOut, backOut, quartOut, quintOut } from 'svelte/easing';
	import { scale, fly, fade} from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import Ingredient from '$lib/components/badges/Ingredient.svelte';
	import { beforeNavigate, invalidateAll } from '$app/navigation';
	import type { BeforeNavigate } from '@sveltejs/kit';

	interface Props {
		selectedRecipe: typeof Recipes.$inferSelect | null;
		isOpen: boolean;
	}

	let { selectedRecipe, isOpen=$bindable() }: Props = $props();
	// Create a new recipe object for updates/creation
	let updatedRecipe = $state(JSON.parse(JSON.stringify(selectedRecipe)));
	let sortedRecipeStepsByPosition = $derived(updatedRecipe?.steps.map(step=>(step)));
	let isChanges = $derived(JSON.stringify(selectedRecipe) !== JSON.stringify(updatedRecipe))
	let ingredientForm: HTMLFormElement;
	let stepForm: HTMLFormElement;

	$effect(() => {
		if (selectedRecipe === null) {
			updatedRecipe = {
				title: '',
				description: '',
				ingredients: [],
				steps: [],
			};
		}
		ingredientForm.reset();
	});

	// Open the dialog if a recipe is selected or a new recipe is being created
	$effect(() => {
		if (selectedRecipe) {
			isOpen = true;
			updatedRecipe = JSON.parse(JSON.stringify(selectedRecipe));
		}
	});

	beforeNavigate((e: BeforeNavigate)=>{
		if (JSON.stringify(updatedRecipe) !== JSON.stringify(selectedRecipe) && updatedRecipe !== null && updatedRecipe !== undefined && isOpen) {
			if (!confirm('You have unsaved changes. Are you sure you want to leave?')) {
				e.cancel();
			}
		}
	})

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		await fetch('/api/recipes', {
			method: selectedRecipe ? 'PUT' : 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedRecipe),
		});

		isOpen = false;
		await invalidateAll();
	};

	function swapSteps(position: number, positionTwo: number) {
		if (positionTwo < 0 || positionTwo >= updatedRecipe.steps.length) return;

		const step = updatedRecipe.steps[position];
		updatedRecipe.steps[position] = updatedRecipe.steps[positionTwo];
		updatedRecipe.steps[position].position = position;
		updatedRecipe.steps[positionTwo] = step;
		updatedRecipe.steps[positionTwo].position = positionTwo;
	}

	function deleteStep(position: number) {
		updatedRecipe.steps.splice(position, 1);

		updatedRecipe.steps = updatedRecipe.steps.map((step: typeof updatedRecipe.step, index: number) => {
			step.position = index;
			return step;
		});
	}

</script>

<form bind:this={ingredientForm} class="hidden" id="ingredientForm" onsubmit={(e)=>{
	e.preventDefault();
	const formData = new FormData(e.target);
	const ingredient = formData.get('ingredient');

	if (ingredient) {
		updatedRecipe.ingredients.push({
			name: ingredient.toString(),
			required: 0,
		});
	}
	ingredientForm.reset();

}}>
</form>

<form bind:this={stepForm} class="hidden" id="stepForm" onsubmit={(e)=>{
	e.preventDefault();
	const formData = new FormData(e.target);
	const step = formData.get('step');

	if (step) {
		updatedRecipe.steps.push({
			description: step.toString(),
			position: updatedRecipe.steps.length,
		});
	}
	stepForm.reset();
}}>

</form>


<Dialog.Root bind:open={isOpen}>

	<Dialog.Portal>
		<Dialog.Overlay
										class="data-[state=open]:animate-in data-[state=closed]:animate-out backdrop-blur-sm data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover overflow-clip data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border sm:max-w-[775px] md:w-full"
		>
			<div class="flex flex-col p-5">
				<Dialog.Title
					class="flex w-full items-center justify-center text-lg font-semibold tracking-tight gap-2"
				>
					{selectedRecipe?.title || 'New Recipe'}
				</Dialog.Title>
				<Separator.Root class="bg-muted -mx-5 mb-6 mt-5 block h-px" />

				<form class="flex flex-col md:flex-row gap-4 size-full max-h-96 overflow-y-auto" onsubmit={(e)=>{handleSubmit(e)}} id="recipeForm">
<!--			Main detail section		-->
					<div class="flex flex-col gap-1.5 basis-1/2 h-full">
						<Input required placeholder={updatedRecipe.title} label="Title"
									 bind:value={updatedRecipe.title} maxlength="50" minlength="1" />
						<Input required placeholder={updatedRecipe.description} label="Description" box={true}
									 bind:value={updatedRecipe.description} class="min-h-24 align-text-top"
						maxlength="100" minlength="1" />

						<div class="flex flex-row flex-grow w-full h-24 gap-1.5">
							<div class="flex flex-col gap-0.5 h-24 w-1/2 basis-1/2">
									<label for='colourPicker' class="text-sm text-muted-foreground">Colour</label>
									<input id="colourPicker" class="h-16 w-full rounded-xl p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-none aria-selected:border-none aria-selected:outline-1.5 outline outline-0
								aria-selected:ring-none !ring-none !shadow-none !outline-none outline-white ring-white ring-offset-none aria-selected:outline-slate-500"
										 type="color" bind:value={updatedRecipe.hexColour} />
							</div>
							<Input class=" !h-16 !w-full text-xs " box type="text" placeholder="<svg> ... </svg>" label="Icon (SVG)" bind:value={updatedRecipe.svgIcon} />
						</div>

	<!--				Ingredients	-->
						<div class="flex flex-row gap-1.5 flex-wrap w-full">
							{#each updatedRecipe.ingredients as ingredient, index}
								<Ingredient editable={true} bind:ingredient={updatedRecipe.ingredients[index]} removeIngredientCallback={
								() => {
									updatedRecipe.ingredients.splice(index, 1);
								}
								} />
							{/each}
							<div class="flex flex-row p-2 px-3 rounded-3xl text-xs w-40 text-sm bg-emerald-200 border border-emerald-600 border-dashed">
								<input form="ingredientForm" name="ingredient" placeholder="Add an ingredient" class="w-full !ring-offset-none !ring-none !shadow-none !outline-none !ring-0 ring-offset-0 ring-transparent" />
								<button
									form="ingredientForm"
									aria-label="Add ingredient"
									type="submit">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus text-foreground"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
								</button>
						</div>
					</div>
					</div>

<!--			Steps		-->
					<div class="flex flex-col gap-1.5 h-full basis-1/2">
						{#each sortedRecipeStepsByPosition as step, index (step)}
							<div transition:fly={{y:-50}} animate:flip={{duration: 275, easing: backOut}} class="flex flex-row gap-2.5 items-center transition-all justify-start content-center gap-2 h-10 bg-slate-100 rounded-xl p-2.5 peer-focus:bg-slate-300">
								<span class="text-muted-foreground">{step.position+1}</span>
								<input class="w-full rounded-md text-sm peer !ring-offset-none !ring-none !shadow-none !outline-none !ring-0 ring-offset-0 ring-transparent p-1 peer" type="text" placeholder="Step Description" bind:value={updatedRecipe.steps[index].description} />
								<div class="flex flex-row w-20">
									{#if step.position !== 0}
										<button
											form=""
											transition:fly={{y:5, duration: 250}}
											aria-label="Move step up"
											class="!bg-slate-100 cursor-pointer basis-full"
											onclick={() => {
												swapSteps(step.position, step.position - 1);
											}}
											type="button"
										 >
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
										</button>
									{/if}

									{#if step.position !== updatedRecipe.steps.length - 1}
										<button
											form=""
											aria-label="Move step down"
											transition:fly={{y:-5, duration: 250}}
											class="!bg-slate-100 cursor-pointer w-full flex flex-row justify-end basis-full"
											onclick={() => {
												swapSteps(step.position, step.position + 1);
											}}
											type="button"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
										</button>
									{/if}

									<button
										form=""
										aria-label="Delete step"
										class=" cursor-pointer w-full flex flex-row justify-end basis-0"
										onclick={() => {
											deleteStep(step.position);
										}}
										type="button"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="rounded-md hover:bg-destructive/30 transition-colors lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
									</button>
								</div>
							</div>
						{/each}

						<div class="flex flex-row gap-2.5 items-center justify-start content-center gap-2 h-10 text-foreground
						 bg-emerald-200 rounded-xl p-2.5 border border-dashed border-emerald-600 peer-focus:bg-slate-300">
							<span class="text-muted-foreground">{updatedRecipe.steps.length+1}</span>
							<input name="step" form="stepForm" class="w-full text-sm rounded-md peer !ring-offset-none !ring-none !shadow-none !outline-none !ring-0 ring-offset-0 ring-transparent p-1 peer" type="text" placeholder="Add a step" />
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
						</div>

						</div>

				</form>


				<Dialog.Close
					class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden cursor-pointer absolute right-5 top-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
				>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
						<span class="sr-only">Close</span>
					</div>
				</Dialog.Close>
			</div>
			<div class="w-full flex flex-row justify-end p-2.5 bg-slate-50">
				<div class="flex flex-row gap-2 items-center">
					{#if isChanges}
						<button class="flex flex-row gap-2 items-center z-0 cursor-pointer hover:bg-slate-200 p-1.5 px-2.5 transition-colors rounded-3xl" transition:fly={{x:60, duration: 175, easing: quartOut}}
										aria-label="Discard changes" onclick={()=>{
										updatedRecipe = JSON.parse(JSON.stringify(selectedRecipe));
							}}>
							Unsaved changes
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
							</button>
					{/if}
					<Button
						class="peer-invalid:bg-slate-100 !bg-emerald-700 !font-medium text-white cursor-pointer gap-2.5 z-10 {isChanges || '!bg-slate-200 !text-muted-foreground'}"
						form="recipeForm"
						type="submit"
						disabled={!isChanges}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
						Save
					</Button>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
