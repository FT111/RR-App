import type { PageServerLoad } from '../../../../../.svelte-kit/types/src/routes';
import { db } from '$lib/server/db';
import { Recipes } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

interface pageParams {
	params: {
		recipeID: string;
	}
}

export const load: PageServerLoad = async ({ params }: pageParams) => {
	const recipe = await db.query.Recipes.findFirst({
		where: eq(Recipes.id, params.recipeID),
		with: {
			ingredients: true,
			steps: true
		}
	});

	return {
		recipe
	}
}