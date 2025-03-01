import { sqliteTable, text, integer, primaryKey, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

export const Recipes = sqliteTable("recipes", {
	id: text("id").primaryKey().$defaultFn(()=>uuid()),
	title: text().notNull().unique(),
	description: text().notNull(),
	createdAt: integer("created_at").default(Date.now()).notNull(),
	updatedAt: integer("updated_at").default(Date.now()).notNull()
})

export const RecipeRelations = relations(Recipes, ({many}) => ({
	ingredients: many(Ingredients)
}))

export const Ingredients = sqliteTable("ingredients", {
	id: text("id").primaryKey().$defaultFn(()=>uuid()),
	name: text().notNull().unique(),
	recipeId: integer("recipe_id").notNull().references(() => Recipes.id),
	createdAt: integer("created_at").default(Date.now()).notNull(),
	updatedAt: integer("updated_at").default(Date.now()).notNull()
})

export const IngredientRelations = relations(Ingredients, ({one}) => ({
	recipe: one(Recipes, {fields: [Ingredients.recipeId], references: [Recipes.id]}),

}))