import type { ExistingRecipeWithIngredientAndSteps } from '$lib/server/db/queries/recipes';

export const recipeHasValidationErrors = (
	recipe: ExistingRecipeWithIngredientAndSteps,
	newRecipe: boolean = false
) => {
	if (!recipe) return 'Missing Recipe Data';

	// No recipe ID specified and not a new recipe
	if (!(recipe.id || newRecipe)) return 'Missing Recipe ID';
	// Title not specified or too long
	if (!recipe.title || recipe.title?.length <= 0 || recipe.title?.length >= 50)
		return 'Invalid Recipe Title';
	// Description not specified or too long
	if (!recipe.description || recipe.description?.length <= 0 || recipe.title?.length >= 100)
		return 'Invalid Recipe Description';
	// Colour specified and not 7 characters
	if (recipe.hexColour && recipe.hexColour?.length !== 7) return 'Invalid Recipe Hex Colour';
	return false;
};