"use server";

//@ts-expect-error
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";

import { user, session } from "app/schema";

export interface Session {
  token: string;
}

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const sessionToken = await generateSession(username, "");
  console.log(sessionToken);
}

export async function generateSession(
  username: string,
  password: string
): Promise<Session> {
  const { env } = getRequestContext();
  const db = drizzle(env.MAIN_DB as D1Database);
  const result = await db
    .select()
    .from(user)
    .where(eq(user.username, username));
  //console.log(result.entries());

  return { token: "test_token" };
}
