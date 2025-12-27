import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

export { db };
