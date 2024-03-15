import getDB from "app/db";
import { session as sessionTable, user as userTable } from "app/schema";
import { and, eq, gt } from "drizzle-orm";

// Data Models
import User from "./User";

export default class Session {
  public id;
  public userID;
  public createdOn;
  public expiration;
  public token;

  private constructor(
    id: number,
    userID: number,
    createdOn: string,
    expiration: string,
    token: string
  ) {
    this.id = id;
    this.userID = userID;
    this.createdOn = createdOn;
    this.expiration = expiration;
    this.token = token;
  }

  static async generateSession(
    username: string,
    password: string
  ): Promise<Session | null> {
    const user = await User.fetchUserByUsername(username);
    if (user == null) {
      return null;
    }

    const passwordCorrect = await user.verifyPassword(password);
    if (!passwordCorrect) {
      return null;
    }

    const db = getDB();

    const now = new Date();

    const expiration = new Date(now);
    expiration.setSeconds(expiration.getSeconds() + 10);

    const buffer = new Uint8Array(128);
    crypto.getRandomValues(buffer);
    const token = Buffer.from(buffer).toString("hex");

    const insertedSession = await db
      .insert(sessionTable)
      .values({
        userID: user.id,
        token: token,
        createdOn: now.toISOString(),
        expiration: expiration.toISOString(),
      })
      .returning();

    const session = insertedSession[0];

    return new Session(
      session.id,
      session.userID,
      session.createdOn,
      session.expiration,
      session.token
    );
  }

  static async verifyToken(token: string): Promise<User | null> {
    const db = getDB();
    const now = new Date().toISOString();

    const sessions = await db
      .select()
      .from(sessionTable)
      .where(
        and(eq(sessionTable.token, token), gt(sessionTable.expiration, now))
      );

    console.log(sessions);

    if (sessions.length !== 1) {
      return null;
    }

    return User.fetchUserByID(sessions[0].userID);
  }
}
