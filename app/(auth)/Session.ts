"use server";

import getDB from "app/db";
import { session as sessionTable } from "app/schema";
import { eq } from "drizzle-orm";

export default class Session {
    constructor(    
        id: number,
        userID: number,
        createdOn: string,
        expiration: string ) {}

    async save(): Promise<void> {
        const db = getDB();
        await db.insert(sessionTable).values();
    }

    static async verifyToken(token: string): Promise<boolean> {
        // Implement token verification logic
        // You can query the database to check if the token exists and if it's not expired
        const db = getDB(); // Assuming you have a function to get the database connection
        const session = await db.select(sessionTable).where(eq("token", token)).execOne();
        if (session) {
            // Check if the session is expired
            const currentTime = new Date().toISOString();
            return currentTime < session.expiration;
        }
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
