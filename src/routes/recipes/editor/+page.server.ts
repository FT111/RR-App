import { getRecipes } from '$lib/server/db/queries/recipes';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	return getRecipes();
}