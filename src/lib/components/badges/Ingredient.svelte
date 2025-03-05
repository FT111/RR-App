<script lang="ts">
    import type { Ingredients } from '$lib/server/db/schema';
	import type { Snippet } from 'svelte';

	interface Props {
		ingredient: typeof Ingredients.$inferSelect | { name: string };
    class?: string;
    snippet?: Snippet;
    [key: string]: any;
	}

	let { ingredient, class: className = '', snippet, ...restProps }: Props = $props()
</script>

<div class="{className} flex flex-row gap-2.5 min-w-14 items-center justify-center content-center bg-cyan-200 rounded-3xl p-2.5" {...restProps}>
    <div class="flex flex-row gap-0.5 items-center text-muted-foreground justify-start w-full text-left">
        {@render snippet?.()}
        <p class="text-xs text-foreground-alt flex flex-wrap text-center justify-center w-full text-pretty font-normal">{
            ingredient.name
        }</p>
    </div>
</div>

