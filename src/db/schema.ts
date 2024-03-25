import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

export const user = pgTable("user", {
  id: integer("id").primaryKey(),
  text: text("name").notNull().unique()
});
export const tag = pgTable("tags", {
  id: integer("id").primaryKey(),
  text: text("tags").notNull().unique()
});