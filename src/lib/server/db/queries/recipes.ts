// CRUD operations for recipes
import { db } from '$lib/server/db';
import { Recipes } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const getRecipes = async () => {
	const recipes = await db.query.Recipes.findMany({
		with: {
			ingredients: true,
			steps: true
		}})

	return {
		recipes
	}
}

export const updateRecipe = async (recipe: typeof Recipes.$inferSelect)=> {
	const recipes = await db.update(Recipes)
		.set({
			title: recipe.title,
			description: recipe.description,
			hexColour: recipe.hexColour,
			svgIcon: recipe.svgIcon
		}).where(eq(Recipes.id, recipe.id))
		.returning({id: Recipes.id})
	return {
		recipes
	}
}

export const createRecipe = async (recipe: typeof Recipes.$inferSelect)=> {
	const recipes = await db.insert(Recipes).values({
		title: recipe.title,
		description: recipe.description,
		hexColour: recipe.hexColour,
		svgIcon: recipe.svgIcon
	}).returning({id: Recipes.id})
	return {
		recipes
	}
}


export const deleteRecipe = async (recipeId: string)=> {
	const recipes = await db.delete(Recipes)
		.where(eq(Recipes.id, recipeId))
		.returning({id: Recipes.id})
	return {
		recipes
	}
}

