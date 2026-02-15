import { InsertTask, UpdateTask } from "@/features/task/type";
import { TaskRepository } from "@/features/task/server/task.repository";
import {
  CreateTaskDto,
  UpdateStatusDto,
  UpdateTaskDto,
} from "@/app/api/task/route";

export class TaskService {
  constructor(private readonly repository = new TaskRepository()) {}

  async getTasks() {
    return this.repository.findAll();
  }

  async getTaskById(id: number) {
    return this.repository.findById(id);
  }

  async createTask(payload: CreateTaskDto) {
    const data: InsertTask = {
      title: payload.title,
      description: payload.description ?? null,
      priorityQuadrant:
        payload.priorityQuadrant as InsertTask["priorityQuadrant"],
      date: payload.date ? new Date(payload.date) : undefined,
      tags: payload.tags ?? null,
    };

    return this.repository.create(data);
  }

  async updateTask(payload: UpdateTaskDto) {
    const data: Omit<UpdateTask, "id"> = {
      title: payload.title,
      description: payload.description ?? null,
      priorityQuadrant:
        payload.priorityQuadrant as UpdateTask["priorityQuadrant"],
      date: payload.date ?? null,
      tags: payload.tags ?? null,
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
