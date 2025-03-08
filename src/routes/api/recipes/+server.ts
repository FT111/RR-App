import {
	type ExistingRecipeWithIngredientAndSteps,
	insertRecipeOrUpdateIfExists
} from '$lib/server/db/queries/recipes';
import type { RequestHandler } from './$types';
import { recipeHasValidationErrors } from '$lib/server/db/validation';

export const PUT: RequestHandler = async ({ request }) => {
	const recipe: ExistingRecipeWithIngredientAndSteps = await request.json();

	if (recipeHasValidationErrors(recipe)) return new Response('Unprocessable Data', { status: 422 });

	const update = await insertRecipeOrUpdateIfExists(recipe);
	if (update.error) return new Response('Unprocessable Data', { status: 422 });

	return new Response(null, { status: 204 });
};

export const POST: RequestHandler = async ({ request }) => {
	const recipe: ExistingRecipeWithIngredientAndSteps = await request.json();

	if (recipeHasValidationErrors(recipe, true))
		return new Response('Unprocessable Data', { status: 422 });

	const insert = await insertRecipeOrUpdateIfExists(recipe, false);
	if (insert.error) return new Response('Unprocessable Data', { status: 422 });

	return new Response(null, { status: 201 });
};