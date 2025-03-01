
<script lang="ts">

	let {data} = $props();
</script>

<div class="flex flex-col gap-2.5">
	<ul class="flex flex-col gap-1.5 p-4 rounded-2xl bg-slate-50">
		{#each data.recipes as recipe (recipe.id)}
			<li>{recipe.title}</li>
		{/each}
	</ul>

	<form class="flex flex-col gap-3.5 p-4 rounded-2xl" method="POST">
		<input type="text" name="title" placeholder="Recipe Name" />
		<input type="text" name="description" placeholder="Description" />
		<button type="submit">Add Recipe</button>
	</form>
</div>
