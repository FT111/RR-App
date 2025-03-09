import { drizzle } from 'drizzle-orm/libsql/node';
import * as schema from './schema';
import type { Client } from '@libsql/client';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';


export let db: LibSQLDatabase<typeof schema> & { $client: Client };

if (!import.meta.env.VITE_LOCAL_DB_URL) {
	 db = drizzle({ connection:
		{
			url: import.meta.env.VITE_DATABASE_URL,
			authToken: import.meta.env.VITE_DATABASE_TOKEN,
		}, schema });

} else {
	 db = drizzle({ connection:
		{
			url: import.meta.env.VITE_LOCAL_DB_URL,
		}, schema });
}

