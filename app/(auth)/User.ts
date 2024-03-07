"use server";

//@ts-expect-error
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "app/schema";
import { user as userTable, session } from "app/schema";
import { eq } from "drizzle-orm";

const { env } = getOptionalRequestContext();
const db = drizzle(env.MAIN_DB as D1Database, { schema });

export default interface User {
  ID: number;
  username: string;
  passwordHash: string;
}

export async function fetchUserByUsername(
  username: string
): Promise<User | null> {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username));

  console.log(user.length);

  return null; //Replace this later.
}

export async function createUser(
  username: string,
  password: string
): Promise<User> {
  console.log(await fetchUserByUsername(username));
  if ((await fetchUserByUsername(username)) !== null) {
    throw new Error(`Cannot create user "${username}", username is taken`);
  }

  const passwordHash = await hashPassword(password);

  const user = await db
    .insert(userTable)
    .values({ username, passwordHash })
    .returning();
  console.log(user);

  return {
    ID: 1,
    username: "placeholder_return",
    passwordHash: "placeholder_passwordHash",
  };
}

export async function isUsernameTaken(username: string): Promise<boolean> {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username));

  return user.length !== 0;
}

// REALLY REALLY BAD PRACTICE, I'M AWARE. I CANNOT BE BOTHERED WITH THE SOLUTION TO THIS AS IT'S BEEN A RIGHT PAIN AND SECURITY FOR THIS IS NOT THAT IMPORTANT.
async function hashPassword(password: string) {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Convert the password and salt to ArrayBuffer
  const passwordBuffer = new TextEncoder().encode(password);
  const saltBuffer = new Uint8Array(salt).buffer;

  // Concatenate the password and salt
  const concatenatedBuffer = new Uint8Array(
    passwordBuffer.byteLength + saltBuffer.byteLength
  );
  concatenatedBuffer.set(new Uint8Array(passwordBuffer), 0);
  concatenatedBuffer.set(new Uint8Array(saltBuffer), passwordBuffer.byteLength);

  // Hash the concatenated password and salt
  const hashBuffer = await crypto.subtle.digest("SHA-256", concatenatedBuffer);

  // Convert the hash and salt to hexadecimal strings
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const saltHex = Array.from(new Uint8Array(salt))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex + saltHex;
}
