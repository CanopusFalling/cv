import getDB from "app/db";
import { session as sessionTable, user as userTable } from "app/schema";
import { eq } from "drizzle-orm";

// Data Models
import User from "./User";

const DETAULT_SESSION_LENGTH = 10000;

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

  static async generateSession(username: string): Promise<Session | null> {
    const user = await User.fetchUserByUsername(username);

    if (user == null) {
      return null;
    }

    const db = getDB();

    const now = new Date();

    const expiration = new Date(now);
    expiration.setHours(expiration.getHours() + 1);

    const buffer = new Uint8Array(512);
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
