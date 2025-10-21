export type TodoStatus = "todo" | "in-progress" | "done";

export type Todo = {
  id: string;
  task: string;
  status: TodoStatus;
  created_at?: string;
  createdAt?: string; // Keep for compatibility
};
