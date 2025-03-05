import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

export const Recipes = sqliteTable("recipes", {
	id: text("id").primaryKey().$defaultFn(()=>uuid()),
	title: text().notNull().unique(),
	description: text().notNull(),
	hexColour: text("hex_colour"),
	svgIcon: text("svg_icon"),
	createdAt: integer("created_at").$defaultFn(()=>Date.now()).notNull(),
	updatedAt: integer("updated_at").$defaultFn(()=>Date.now()).notNull(),
})

export const RecipeRelations = relations(Recipes, ({many}) => ({
	ingredients: many(Ingredients),
	steps: many(Steps)
}))

export const Ingredients = sqliteTable("ingredients", {
	id: text("id").primaryKey().$defaultFn(()=>uuid()),
	name: text().notNull(),
	required: integer().default(1),
	recipeId: text("recipe_id").notNull().references(() => Recipes.id),
	createdAt: integer("created_at").$defaultFn(()=>Date.now()).notNull()
})

export const IngredientRelations = relations(Ingredients, ({one}) => ({
	recipe: one(Recipes, {fields: [Ingredients.recipeId], references: [Recipes.id]}),

}))

export const Steps = sqliteTable("steps", {
	id: text("id").primaryKey().$defaultFn(()=>uuid()),
	description: text().notNull(),
	position: integer().notNull(),
	recipeId: text("recipe_id").notNull().references(() => Recipes.id),
	createdAt: integer("created_at").$defaultFn(()=>Date.now()).notNull(),
})

export const StepRelations = relations(Steps, ({one}) => ({
	recipe: one(Recipes, {fields: [Steps.recipeId], references: [Recipes.id]})
}))