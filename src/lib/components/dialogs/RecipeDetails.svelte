<script lang="ts">
	import { Dialog, Label, Separator } from "bits-ui";
	import type { Recipes } from '$lib/server/db/schema';
	import type { Snippet, SvelteComponent } from 'svelte';

	interface Props {
		recipe: typeof Recipes.$inferSelect | null;
		closeCallback: () => void;
		children?: Snippet;
	}

	let { recipe, closeCallback, children }: Props = $props();
	let dialogBox = $state(null);

</script>


<Dialog.Root open={!!recipe} onOpenChange={()=>{
	if (recipe) {
		closeCallback();
	} else {dialogBox.focus()
	}
}}>
	<Dialog.Portal>
		<Dialog.Overlay bind:ref={dialogBox}
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border p-5 sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
			>
				{recipe?.title}
			</Dialog.Title>
			<Separator.Root class="bg-muted -mx-5 mb-6 mt-5 block h-px" />

			<div class="size-full max-h-96 overflow-y-auto">
				{@render children?.()}
			</div>

			<Dialog.Close
				class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden cursor-pointer absolute right-5 top-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
			>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
