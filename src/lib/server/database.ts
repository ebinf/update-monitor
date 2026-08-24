import { building } from '$app/env';
import { env } from '$env/dynamic/private';
import { PrismaClient } from '$prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const connectionString = env.DATABASE_URL;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

if (!building) {
	// Reset isFetching to false on server start
	await prisma.remote.updateMany({
		data: {
			isFetching: false
		}
	});
}

export default prisma;
