import { getRecipes, updateRecipe } from '$lib/server/db/queries/recipes';
import type { RecipeWithIngredientsAndSteps } from '$lib/server/db/queries/recipes';
import type { Actions, PageServerLoad } from '../../../../../.svelte-kit/types/src/routes';


export const load: PageServerLoad = async () => {
	return getRecipes();
}

