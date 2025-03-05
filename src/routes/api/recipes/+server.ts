import { type ExistingRecipeWithIngredientAndSteps, updateRecipe } from '$lib/server/db/queries/recipes';
import type { RequestHandler } from './$types';
import { validateRecipe } from '$lib/server/db/validation';

export const PUT: RequestHandler = async ({ request }) => {
	const recipe: ExistingRecipeWithIngredientAndSteps = await request.json();

	if (validateRecipe(recipe)) return new Response('Unprocessable Data', { status: 422 });

	const update = await updateRecipe(recipe);
	if (update.error) return new Response('Unprocessable Data', { status: 422 });

	return new Response(null, { status: 204 });
}