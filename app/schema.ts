//Drizzle ORM Schema Definition.

import { sql } from "drizzle-orm";

import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const document = sqliteTable("document", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const version = sqliteTable("version", {
  id: integer("id").primaryKey(),
  name: text("name"),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
  markdown: blob("markdown"),
  documentID: integer("documentID").references(() => document.id),
});
