import { axiosInstance } from "@/lib/axios";
import { CreateTaskSchema } from "@/features/todo/schema/form-task.schema";
import { GetTaskResponse } from "@/features/todo/type";

export class TaskApiService {
  static async getTasks() {
    const res = await axiosInstance.get<GetTaskResponse>("/todo");
    return res.data;
  }

  static async getTaskById(id: number) {
    const res = await axiosInstance.get(`/todo/${id}`);
    return res.data;
  }

  static async createTask(payload: CreateTaskSchema) {
    const res = await axiosInstance.post("/todo", payload);
    return res.data;
  }

  static async updateTask(payload: CreateTaskSchema & { id: number }) {
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
