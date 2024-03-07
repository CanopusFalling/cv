//@ts-expect-error
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "app/schema";
import { user as userTable, session } from "app/schema";
import { eq } from "drizzle-orm";

const { env } = getOptionalRequestContext();
const db = drizzle(env.MAIN_DB as D1Database, { schema });

export default class User {
  private constructor(
    private ID: number,
    private username: string,
    private passwordHash: string
  ) {}

  static async fetchUserByUsername(username: string): Promise<User | null> {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    console.log(user.length);

    return null; //Replace this later.
  }

  async verifyPassword(password: string): Promise<boolean> {
    return true;
  }

  static async createUser(username: string, password: string): Promise<User> {
    console.log(await this.fetchUserByUsername(username));
    if ((await this.fetchUserByUsername(username)) !== null) {
      throw new Error(`Cannot create user "${username}", username is taken`);
    }

    const passwordHash = await this.hashPassword(password);

    const user = await db
      .insert(userTable)
      .values({ username, passwordHash })
      .returning();
    console.log(user);

    return new User(1, "placeholder_return", "placeholder_passwordHash");
  }

  static async isUsernameTaken(username: string): Promise<boolean> {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    return user.length !== 0;
  }

  // REALLY REALLY BAD PRACTICE, I'M AWARE. I CANNOT BE FUCKED WITH THE SOLUTION TO THIS AS IT'S BEEN A RIGHT PAIN AND SECURITY FOR THIS IS NOT THAT IMPORTANT.
  static async hashPassword(password: string) {
    // Generate a random salt
    const salt = crypto.getRandomValues(new Uint8Array(16)); // You can adjust the salt length as needed

    // Convert the password and salt to ArrayBuffer
    const passwordBuffer = new TextEncoder().encode(password);
    const saltBuffer = new Uint8Array(salt).buffer;

    // Concatenate the password and salt
    const concatenatedBuffer = new Uint8Array(
      passwordBuffer.byteLength + saltBuffer.byteLength
    );
    concatenatedBuffer.set(new Uint8Array(passwordBuffer), 0);
    concatenatedBuffer.set(
      new Uint8Array(saltBuffer),
      passwordBuffer.byteLength
    );

    // Hash the concatenated password and salt
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      concatenatedBuffer
    );

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
}
