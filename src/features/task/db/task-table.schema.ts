import {
  integer,
  pgTable,
  text,
  varchar,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const taskPriorityQuadrantEnum = pgEnum("task_priority_quadrant", [
  "do-first",
  "delegate",
  "schedule",
  "eliminate",
]);

export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  priorityQuadrant: taskPriorityQuadrantEnum("priority_quadrant").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  tags: text().array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
