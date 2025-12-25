import { todosTable } from "@/features/todo/schema/todo-table.schema";

export type TodoStatus = "todo" | "in-progress" | "done";

export type Todo = {
  id: string;
  name: string;
  desription: string | null;
  status: TodoStatus;
  created_at: string;
  updated_at: string | null;
};

export type InsertTodo = typeof todosTable.$inferInsert;
export type UpdateTodo = Partial<InsertTodo> & { id: number };
export type SelectTodo = typeof todosTable.$inferSelect;
