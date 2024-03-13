"use server";

import getDB from "app/db";
import { session as sessionTable, user as userTable } from "app/schema";
import { eq } from "drizzle-orm";

import User from "./User";

import bcrypt from "bcryptjs";

const DETAULT_SESSION_LENGTH = 10000;

export default class Session {
  public id;
  public userID;
  public createdOn;
  public expiration;

  constructor(
    id: number,
    userID: number,
    createdOn: string,
    expiration: string
  ) {
    this.id = id;
    this.userID = userID;
    this.createdOn = createdOn;
    this.expiration = expiration;
  }

  async verifyToken(token: string): Promise<User | null> {
    const db = getDB();
    const sessionEntry = await db
      .select()
      .from(sessionTable)
      .innerJoin(userTable, eq(sessionTable.userID, userTable.id))
      .where(eq(sessionTable.token, token));

    if (sessionEntry.length == 1) {
      return User.fetchUserByUsername(sessionEntry[0].user.username);
    }

    return null;
  }

  //   async createSession(user: User): Promise<Session> {
  //     const db = getDB();

  //     const userID = user.id;
  //     const token =

  //     const sessionInfo = await db.insert(sessionTable).values({userID}).returning();
  //   }

  //   static async getUserFromToken(token: string): Promise<number | null> {
  //     const sessionEntry = await db
  //       .select()
  //       .from(sessionTable)
  //       .innerJoin(userTable, eq(sessionTable.userID, userTable.id))
  //       .where(eq(sessionTable.token, token));
  //   }
}
