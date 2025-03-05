import type { ExistingRecipeWithIngredientAndSteps } from '$lib/server/db/queries/recipes';

export const validateRecipe = (recipe: ExistingRecipeWithIngredientAndSteps) => {
	if (!recipe.id) return 'Missing Recipe ID';
	if (!recipe.title || recipe.title?.length <= 0 || recipe.title?.length >= 50) return 'Invalid Recipe Title';
	if (!recipe.description || recipe.description?.length <= 0 || recipe.title?.length >= 100) return 'Invalid Recipe Description';
	return false;
}