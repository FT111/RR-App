<script lang="ts">
	interface Props {
		class?: string;
		value?: string;
		label?: string;
		required?: boolean;
		box?: boolean;
		[key: string]: unknown;
	}

	let { class: className = '', value = $bindable(), box, label, required, ...restProps }: Props = $props();
</script>

<div class="flex flex-col gap-0.5 size-full">
	{#if label}
		<div class="{required && 'justify-between'} flex flex-row">
			<label for={label} class="text-sm text-muted-foreground">{label}</label>
			{#if required}
				<span class="text-xs text-muted-foreground">Required</span>
			{/if}
		</div>
	{/if}
	{#if box}
		<textarea id={label} class="{className} rounded-xl p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-none aria-selected:border-none aria-selected:outline-1.5 outline outline-0
							aria-selected:ring-none !ring-none !shadow-none !outline-none outline-white ring-white ring-offset-none aria-selected:outline-slate-500" bind:value={value} {...restProps}></textarea>
	{:else}
	<input {required} id={label} class="{className} rounded-xl p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-none aria-selected:border-none aria-selected:outline-1.5 outline outline-0
							aria-selected:ring-none !ring-none !shadow-none !outline-none outline-white ring-white ring-offset-none aria-selected:outline-slate-500" bind:value={value} {...restProps} />
{/if}
</div>
