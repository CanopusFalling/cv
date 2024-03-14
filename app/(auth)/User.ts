import getDB from "app/db";
import { user as userTable } from "app/schema";
import { eq } from "drizzle-orm";

// Data Models
import Session from "./Session";

import bcrypt from "bcryptjs";
const SALT_CYCLES = 10;

export default class User {
  public id;

  private constructor(id: number) {
    this.id = id;
  }

  async validateExists(): Promise<boolean> {
    const db = getDB();

    const userList = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, this.id));

    return userList.length != 0;
  }

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

    return new User(user.id);
  }

  async verifyPassword(password: string): Promise<boolean> {
    return false;
  }

  static async createUser(
    username: string,
    password: string
  ): Promise<User | null> {
    console.log(await this.fetchUserByUsername(username));
    if ((await this.fetchUserByUsername(username)) !== null) {
      throw new Error(`Cannot create user "${username}", username is taken`);
    }

    const passwordHash = await this.hashPassword(password);

    const db = getDB();

    const users = await db
      .insert(userTable)
      .values({ username, passwordHash })
      .returning();

    if (users.length == 1) {
      return new User(users[0].id);
    } else {
      throw new Error("Error, no user created");
    }
  }

  static async isUsernameTaken(username: string): Promise<boolean> {
    const db = getDB();

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username));

    return user.length !== 0;
  }

  private static async hashPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, SALT_CYCLES);
  }
}
