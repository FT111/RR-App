// CRUD operations for recipes
import { db } from '$lib/server/db';
import { Ingredients, Recipes, Steps } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';


const mapRecipeChildWithIDs = (items: Array<typeof Ingredients.$inferInsert |  typeof Steps.$inferInsert>, recipeId: string): typeof Ingredients.$inferInsert |  typeof Steps.$inferInsert =>
	items.map(item => ({ ...item, id: uuid(), recipeId }));


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

export const insertRecipeOrUpdateIfExists = async (recipe: ExistingRecipeWithIngredientAndSteps, exists: boolean = true)=> {
	try {
		// If the recipe exists, update it, otherwise insert it
		// Generate a new UUID if the recipe is new
		recipe.id = exists ? recipe.id : uuid()

		await db.insert(Recipes)
			.values({
				id: recipe.id,
				title: recipe.title,
				description: recipe.description,
				hexColour: recipe.hexColour,
				svgIcon: recipe.svgIcon
			}).onConflictDoUpdate({
				target: [Recipes.id],
				set: {
					title: recipe.title,
					description: recipe.description,
					hexColour: recipe.hexColour,
					svgIcon: recipe.svgIcon
				},
				setWhere: eq(Recipes.id, recipe.id)
			})

		// @ts-expect-error: TS please stop complaining
		const ingredients: typeof Ingredients.$inferInsert = mapRecipeChildWithIDs(recipe.ingredients, recipe.id);
		// @ts-expect-error: stop
		const steps: typeof Steps.$inferInsert = mapRecipeChildWithIDs(recipe.steps, recipe.id);

		// Update related ingredients and steps
		await db.transaction(async (db) => {
			if (ingredients.length > 0) {
				await db.delete(Ingredients).where(eq(Ingredients.recipeId, recipe.id))
				await db.insert(Ingredients).values(ingredients)
			}
			if (steps.length > 0) {
				await db.delete(Steps).where(eq(Steps.recipeId, recipe.id))
				await db.insert(Steps).values(steps)
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


export const deleteRecipe = async (recipeId: string)=> {
	const recipes = await db.delete(Recipes)
		.where(eq(Recipes.id, recipeId))
		.returning({id: Recipes.id})
	return {
		recipes
	}
}

