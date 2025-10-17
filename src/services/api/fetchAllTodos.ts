import { axiosInstance } from "@/lib/axios";

type StatusTodo = "todo" | "in-progress" | "done";

type TodoResponse = {
  id: number;
  task: string;
  status: StatusTodo;
};

export const fetchAllTodos = async () => {
  const response = await axiosInstance.get<TodoResponse[]>("/todos");
  return response.data;
};
