import { tasksTable } from "@/features/todo/db/task-table.schema";

export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  name: string;
  description: string | null;
  status: TaskStatus;
  created_at: string;
  updated_at: string | null;
};

export type InsertTask = typeof tasksTable.$inferInsert;
export type UpdateTask = Partial<InsertTask> & { id: number };
export type SelectTask = typeof tasksTable.$inferSelect;

export type GetTaskResponse = Task[];
