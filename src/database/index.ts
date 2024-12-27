import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { serverEnv } from "@/env/server";

export const db = drizzle(serverEnv.DATABASE_URL, { schema });

export * from "drizzle-orm";
export type DatabaseConnection =
    | typeof db
    | Parameters<Parameters<(typeof db)["transaction"]>[0]>[0];
