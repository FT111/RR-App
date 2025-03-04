// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Recipes } from '$lib/server/db/schema';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			selectedRecipe: typeof Recipes.$inferSelect;
		}
		// interface Platform {}
	}
}

export {};
