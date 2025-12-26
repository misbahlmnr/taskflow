import {
  integer,
  pgTable,
  text,
  varchar,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("todo_status", [
  "todo",
  "in-progress",
  "done",
]);

export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  status: taskStatusEnum("status").default("todo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
