import {
  integer,
  pgTable,
  text,
  varchar,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const todoStatusEnum = pgEnum("todo_status", [
  "todo",
  "in_progress",
  "done",
]);

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  status: todoStatusEnum("status").default("todo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
