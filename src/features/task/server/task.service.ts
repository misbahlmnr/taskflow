import { InsertTask, UpdateTask } from "@/features/task/type";
import { TaskRepository } from "@/features/task/server/task.repository";
import {
  CreateTodoDto,
  UpdateStatusDto,
  UpdateTodoDto,
} from "@/app/api/task/route";

export class TaskService {
  constructor(private readonly repository = new TaskRepository()) {}

  async getTasks() {
    return this.repository.findAll();
  }

  async getTaskById(id: number) {
    return this.repository.findById(id);
  }

  async createTask(payload: CreateTodoDto) {
    const data: InsertTask = {
      name: payload.name,
      description: payload.description ?? null,
      status: payload.status as InsertTask["status"],
    };

    return this.repository.create(data);
  }

  async updateTask(payload: UpdateTodoDto) {
    const data: Omit<UpdateTask, "id"> = {
      name: payload.name,
      description: payload.description ?? null,
      status: payload.status as UpdateTask["status"],
    };

    return this.repository.update(payload.id, data);
  }

  async deleteTask(id: number) {
    const todo = await this.repository.findById(id);
    if (!todo) {
      throw new Error("Task not found");
    }

    await this.repository.delete(id);
  }

  async updateStatus(payload: UpdateStatusDto) {
    const todo = await this.repository.update(payload.id, {
      status: payload.status as UpdateTask["status"],
    });

    if (!todo) {
      throw new Error("Task not found");
    }

    return todo;
  }
}
