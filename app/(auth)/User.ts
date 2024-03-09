import getDB from "app/db";
import { user as userTable } from "app/schema";
import { eq } from "drizzle-orm";

import Session from "./Session"

interface HashedCredentials {
  passwordHash: string;
  passwordSalt: string;
}

export default class User {

  private constructor(  
    id: number,
    username: string) {}

  static async fetchUserByUsername(username: string): Promise<User | null> {
    const db = getDB();

    const userList = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    if (userList.length == 0) {
      return null;
    }

    const user = userList[0];

    return new User(
      user.id,
      user.username
    );
  }

  async verifyPassword(password: string): Promise<boolean> {
    return false;
  }

  static async createUser(username: string, password: string): Promise<User> {
    console.log(await this.fetchUserByUsername(username));
    if ((await this.fetchUserByUsername(username)) !== null) {
      throw new Error(`Cannot create user "${username}", username is taken`);
    }

    const { passwordHash, passwordSalt } = await this.hashPassword(password);

    const db = getDB();

    const user = await db
      .insert(userTable)
      .values({ username, passwordSalt, passwordHash })
      .returning();
    console.log(user);

    return new User(
      1,
      "placeholder_return",
    );
  }

  static async isUsernameTaken(username: string): Promise<boolean> {
    const db = getDB();

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    return user.length !== 0;
  }

  // REALLY REALLY BAD PRACTICE, I'M AWARE. I CANNOT BE FUCKED WITH THE SOLUTION TO THIS AS IT'S BEEN A RIGHT PAIN AND SECURITY FOR THIS IS NOT THAT IMPORTANT.
  static async hashPassword(
    password: string,
    salt?: string
  ): Promise<HashedCredentials> {
    let saltArray = null;

    if (salt) {
      saltArray = new TextEncoder().encode(salt);
    } else {
      saltArray = crypto.getRandomValues(new Uint8Array(16));
    }

    const saltBuffer = new TextEncoder().encode(saltArray);
    const passwordBuffer = new TextEncoder().encode(password);

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
    const saltHex = saltArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return { passwordHash: hashHex, passwordSalt: saltHex };
  }
}
