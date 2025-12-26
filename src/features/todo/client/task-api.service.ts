import { axiosInstance } from "@/lib/axios";
import { GetTaskResponse, Todo } from "@/features/todo/type";
import { CreateTaskFormValues } from "@/features/todo/schema/form-task.schema";

export class TaskApiService {
  static async getTasks() {
    const res = await axiosInstance.get<GetTaskResponse>("/todo");
    return res.data;
  }

  static async getTaskById(id: number) {
    const res = await axiosInstance.get<Todo>(`/todo/${id}`);
    return res.data;
  }

  static async createTask(payload: CreateTaskFormValues) {
    const res = await axiosInstance.post("/todo", payload);
    return res.data;
  }

  static async updateTask(payload: CreateTaskFormValues & { id: number }) {
    const res = await axiosInstance.put("/todo", payload);
    return res.data;
  }

  static async deleteTask(id: number) {
    const res = await axiosInstance.delete("/todo", {
      params: { id },
    });
    return res.data;
  }

  static async updateStatus(payload: { id: number; status: string }) {
    const res = await axiosInstance.patch("/todo", payload);
    return res.data;
  }
}
