import { drizzle } from 'drizzle-orm/libsql/node';

import * as schema from './schema';

export const db = drizzle({ connection:
		{
			url: import.meta.env.VITE_DATABASE_URL,
			authToken: import.meta.env.VITE_DATABASE_TOKEN,
		}, schema });
