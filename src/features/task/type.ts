import { tasksTable } from "@/features/task/db/task-table.schema";

export type PriorityQuadrantEnum = "do-first" | "delegate" | "schedule" | "eliminate";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  priorityQuadrant: PriorityQuadrantEnum;
  date: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string | null;
};

export type InsertTask = typeof tasksTable.$inferInsert;
export type UpdateTask = Partial<InsertTask> & { id: number };
export type SelectTask = typeof tasksTable.$inferSelect;

export type GetTaskResponse = Task[];
