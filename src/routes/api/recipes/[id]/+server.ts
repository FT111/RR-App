import { deleteRecipe } from '$lib/server/db/queries/recipes';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;
	const { recipes } = await deleteRecipe(id);
	if (recipes.length === 0) return new Response('Not Found', { status: 404 });

	return new Response(null, { status: 204 });
};