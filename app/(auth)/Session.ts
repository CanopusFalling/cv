"use server";

import getDB from "app/db";
import { session as sessionTable, user as userTable } from "app/schema";
import { eq } from "drizzle-orm";

export default class Session {
    constructor(    
        id: number,
        userID: number,
        createdOn: string,
        expiration: string ) {}

    async save(): Promise<void> {
    }

    static async verifyToken(token: string): Promise<boolean> {
        const db = getDB();
        const sessionEntry = await db.select().from(sessionTable).innerJoin(userTable, eq(sessionTable.userID, userTable.id)).where(eq(sessionTable.token, token));

        return false;
    }

    static async getUserFromToken(token: string): Promise<number | null> {
        // Implement logic to get the user ID associated with the token
        const db = getDB(); // Assuming you have a function to get the database connection
        const session = await db.select(sessionTable).where(eq("token", token)).execOne();
        if (session) {
            return session.userID;
        }
        return null;
    }
}
