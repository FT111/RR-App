<script lang="ts">
	import type { Recipes } from '$lib/server/db/schema';
	import { invalidateAll } from '$app/navigation';

	interface Props {
		recipe: typeof Recipes.$inferSelect;
	}

	let { recipe }: Props = $props();

	const handleDelete = async () => {

		await fetch(`/api/recipes/${recipe.id}`, {
			method: "DELETE",
		}).then(() => {
			invalidateAll();
		});
	}
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger
		class="rounded-input
	 hover:brightness-105 hover:bg-destructive/60 text-foreground
	items-center justify-center p-0.5 font-semibold transition-all active:scale-[0.98]"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
	</AlertDialog.Trigger>
	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<AlertDialog.Content
			class="rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 border p-7 sm:max-w-lg md:w-full "
		>
			<div class="flex flex-col gap-4 pb-6">
				<AlertDialog.Title class="text-lg font-semibold tracking-tight">
					Are you sure?
				</AlertDialog.Title>
				<AlertDialog.Description class="text-foreground-alt text-sm">
					This will delete recipe <span class="font-medium">{recipe.title}</span> and all of its associated data.
				</AlertDialog.Description>
			</div>
			<div class="flex w-full items-center justify-center gap-2">
				<AlertDialog.Cancel
					class="h-input rounded-input bg-muted shadow-mini hover:bg-dark-10 focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden inline-flex w-full items-center justify-center text-[15px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
				>
					Cancel
				</AlertDialog.Cancel>
				<AlertDialog.Action onclick={handleDelete}
					class="h-input rounded-input bg-destructive text-background shadow-mini hover:bg-dark/95 focus-visible:ring-dark focus-visible:ring-offset-background focus-visible:outline-hidden inline-flex w-full items-center justify-center text-[15px] font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
				>
					Delete
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>