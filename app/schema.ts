//Drizzle ORM Schema Definition.

import { sql } from "drizzle-orm";

import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  username: text("username").unique().notNull(),
  passwordHash: text("passwordHash").notNull(),
});

export const session = sqliteTable("session", {
  id: integer("id").primaryKey(),
  userID: integer("userID")
    .references(() => user.id)
    .notNull(),
  token: text("token").unique().notNull(),
  createdOn: text("createdOn").default(sql`CURRENT_TIMESTAMP`),
  expiration: text("expiration").notNull(),
});

export const document = sqliteTable("document", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const documentVersion = sqliteTable("documentVersion", {
  id: integer("id").primaryKey(),
  name: text("name"),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
  markdown: blob("markdown").notNull(),
  documentID: integer("documentID")
    .references(() => document.id)
    .notNull(),
});
