<script lang="ts">
	import type { Recipes } from '$lib/server/db/schema';
	import { Dialog, Separator } from 'bits-ui';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { scale, fly} from 'svelte/transition';

	interface Props {
		selectedRecipe: typeof Recipes.$inferSelect | null;
		isOpen: boolean;
	}

	let { selectedRecipe, isOpen=$bindable() }: Props = $props();
	// Create a new recipe object for updates/creation
	let updatedRecipe = $state(selectedRecipe);
	$effect(() => {
		updatedRecipe = selectedRecipe;
		if (selectedRecipe === null) {
			updatedRecipe = {
				title: '',
				description: '',
				ingredients: [],
				steps: [],
			};
		}
	});

	// Open the dialog if a recipe is selected or a new recipe is being created
	$effect(() => {
		if (selectedRecipe) {
			isOpen = true;
		}
	});

	$inspect(updatedRecipe, selectedRecipe)

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
	};

</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Portal>
		<Dialog.Overlay
										class="data-[state=open]:animate-in data-[state=closed]:animate-out backdrop-blur-sm data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover overflow-clip data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border sm:max-w-[490px] md:w-full"
		>
			<div class="flex flex-col p-5">
				<Dialog.Title
					class="flex w-full items-center justify-center text-lg font-semibold tracking-tight gap-2"
				>
					{selectedRecipe?.title || 'New Recipe'}
				</Dialog.Title>
				<Separator.Root class="bg-muted -mx-5 mb-6 mt-5 block h-px" />

				<form class="size-full max-h-96 overflow-y-auto" onsubmit={(e)=>{handleSubmit(e)}} id="recipeForm">
					<Input placeholder={updatedRecipe.title} label="Title" bind:value={updatedRecipe.title} />
					<Input placeholder={updatedRecipe.description} label="Description" box={true} bind:value={updatedRecipe.description} class="min-h-24 align-text-top" />

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
				<Button
					class="!bg-emerald-400 cursor-pointer gap-2.5 "
					form="recipeForm"
					type="submit"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
					Save
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
