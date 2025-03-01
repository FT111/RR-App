import * as schema from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

type recipeForm = {
	title: string;
	description: string;
}


export const load: PageServerLoad = async () => {
	const recipes = await db.query.Recipes.findMany();

	return {
		recipes
	}
}

export const actions = {
	default: async ({ request }) => {

		// Get the form data object
		const data = await request.formData();
		const recipe: recipeForm = {
			title: data.get('title') as string,
			description: data.get('description') as string
		}
		console.log(recipe);

		// Insert the recipe into the database
		const recipes =
			await db.insert(schema.Recipes).values({
				title: recipe.title,
				description: recipe.description
			})
				.returning({id: schema.Recipes.id})
		console.log(recipes);

		return {
			recipes
		}

	}
} satisfies Actions;