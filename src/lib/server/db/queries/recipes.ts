// CRUD operations for recipes
import { db } from '$lib/server/db';
import { Ingredients, Recipes, Steps } from '$lib/server/db/schema';
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


export type ExistingRecipeWithIngredientAndSteps = typeof Recipes.$inferInsert & {
	id: string
	ingredients: typeof Ingredients.$inferInsert[]
	steps: typeof Steps.$inferInsert[]
}

export const updateRecipe = async (recipe: ExistingRecipeWithIngredientAndSteps)=> {
	try {
		await db.update(Recipes)
			.set({
				title: recipe.title,
				description: recipe.description,
				hexColour: recipe.hexColour,
				svgIcon: recipe.svgIcon
			}).where(eq(Recipes.id, recipe.id))

		console.log(recipe)

		// Update related ingredients and steps
		await db.transaction(async (db) => {
			if (recipe.ingredients.length > 0) {
				await db.delete(Ingredients).where(eq(Ingredients.recipeId, recipe.id))
				await db.insert(Ingredients).values(recipe.ingredients)
			}
			if (recipe.steps.length > 0) {
				await db.delete(Steps).where(eq(Steps.recipeId, recipe.id))
				await db.insert(Steps).values(recipe.steps)
			}
		}
		)
	} catch (e) {
		return {
			error: e
		}
	}

	return {
		error: false
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

