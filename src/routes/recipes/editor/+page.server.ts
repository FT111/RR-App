import { getRecipes, updateRecipe } from '$lib/server/db/queries/recipes';
import type { RecipeWithIngredientsAndSteps } from '$lib/server/db/queries/recipes';
import type { Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	return getRecipes();
}

