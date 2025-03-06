<script lang="ts">
    import type { Ingredients } from '$lib/server/db/schema';
	import type { Snippet } from 'svelte';
    import { Button, Tooltip } from 'bits-ui';

    interface Props {
		ingredient: typeof Ingredients.$inferSelect | { name: string, required: boolean };
    class?: string;
    editable?: boolean;
    snippet?: Snippet;
    [key: string]: unknown;
	}

	let { ingredient = $bindable(), editable, class: className = '', snippet, ...restProps }: Props = $props()
</script>

<div class="{className} {ingredient.required || 'bg-slate-100'} flex flex-row gap-2.5 min-w-14 items-center justify-center content-center bg-cyan-200 rounded-3xl p-2.5" {...restProps}>
    <div class="flex flex-row gap-0.5 items-center text-muted-foreground justify-start w-full text-left">
        {#if !ingredient.required}
            <Tooltip.Provider>
                <Tooltip.Root delayDuration={200}>
                    <Tooltip.Trigger>
                        {#if editable}
                            <Button.Root onclick={()=>{ingredient.required=true}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus text-slate-400"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            </Button.Root>
                        {:else}
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus text-slate-400"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        {/if}
                    </Tooltip.Trigger>
                    <Tooltip.Content sideOffset={8}>
                        <div
                          class="z-0 flex items-center justify-center rounded-input border border-dark-10 bg-background p-3 text-sm font-medium shadow-popover outline-none"
                        >
                            <p class="text-foreground-alt">Optional Ingredient</p>
                        </div>
                    </Tooltip.Content>
                </Tooltip.Root>
            </Tooltip.Provider>
        {:else if ingredient.required && editable}
            <Button.Root onclick={()=>{
                ingredient.required = false;
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-asterisk"><path d="M12 6v12"/><path d="M17.196 9 6.804 15"/><path d="m6.804 9 10.392 6"/></svg>
            </Button.Root>
        {/if}
            {@render snippet?.()}
        <p class="text-xs text-foreground-alt flex flex-wrap text-center justify-center w-full text-pretty font-normal">{
            ingredient.name
        }</p>
    </div>
</div>

