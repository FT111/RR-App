import { defineConfig } from 'drizzle-kit';
if (!process.env.VITE_DATABASE_URL) throw new Error('VITE_DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',

	dbCredentials: {
		// SQLite database file for development
		url: process.env.VITE_DATABASE_URL,
		token: process.env.VITE_DATABASE_TOKEN
	},

	verbose: true,
	strict: true,
	dialect: 'sqlite'
});
