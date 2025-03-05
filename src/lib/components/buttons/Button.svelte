<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	}

	let { class: className = '', children, ...restProps }: Props = $props();
</script>




<Button.Root class="rounded-input text-black bg-muted peer
											 shadow-mini hover:bg-muted/95 focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden
				inline-flex h-12 items-center justify-center whitespace-nowrap px-[21px] text-[15px] font-semibold transition-colors focus-visible:ring-2
				focus-visible:ring-offset-2 active:scale-[0.98] hover:brightness-[1.02] transition-all {className}"
	{...restProps}
>
	{@render children?.()}
</Button.Root>