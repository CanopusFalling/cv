//Drizzle ORM Schema Definition.

import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const document = sqliteTable(
  "document",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
  },
  (document) => ({
    nameIdx: uniqueIndex("nameIdx").on(document.name),
  })
);

export const cities = sqliteTable("version", {
  id: integer("id").primaryKey(),
  name: text("name"),
  countryId: integer("country_id").references(() => document.id),
});
