//@ts-expect-error
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "app/schema";

export default function getDB(): DrizzleD1Database<typeof schema> {
  const { env } = getOptionalRequestContext();
  return drizzle(env.MAIN_DB as D1Database, { schema });
}
