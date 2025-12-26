import { axiosInstance } from "@/lib/axios";
import { GetTaskResponse, Task } from "@/features/task/type";
import { CreateTaskFormValues } from "@/features/task/schema/form-task.schema";

export class TaskApiService {
  static async getTasks() {
    const res = await axiosInstance.get<GetTaskResponse>("/task");
    return res.data;
  }

  static async getTaskById(id: number) {
    const res = await axiosInstance.get<Task>(`/task/${id}`);
    return res.data;
  }

  static async createTask(payload: CreateTaskFormValues) {
    const res = await axiosInstance.post("/task", payload);
    return res.data;
  }

  static async updateTask(payload: CreateTaskFormValues & { id: number }) {
    const res = await axiosInstance.put("/task", payload);
    return res.data;
  }

  static async deleteTask(id: number) {
    const res = await axiosInstance.delete("/task", {
      params: { id },
    });
    return res.data;
  }

  static async updateStatus(payload: { id: number; status: string }) {
    const res = await axiosInstance.patch("/task", payload);
    return res.data;
  }
}
