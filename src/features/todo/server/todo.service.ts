import { InsertTodo, UpdateTodo } from "@/features/todo/type";
import { TodoRepository } from "@/features/todo/server/todo.repository";
import { CreateTodoDto, UpdateTodoDto } from "@/app/api/todo/route";

export class TodoService {
  constructor(private readonly repository = new TodoRepository()) {}

  async getTodos() {
    return this.repository.findAll();
  }

  async getTodoById(id: number) {
    return this.repository.findById(id);
  }

  async createTodo(payload: CreateTodoDto) {
    const data: InsertTodo = {
      name: payload.name,
      description: payload.description ?? null,
      status: payload.status as InsertTodo["status"],
    };

    return this.repository.create(data);
  }

  async updateTodo(payload: UpdateTodoDto) {
    const data: UpdateTodo = {
      id: payload.id,
      name: payload.name,
      description: payload.description ?? null,
      status: payload.status as UpdateTodo["status"],
    };

    return this.repository.update(data);
  }

  async deleteTodo(id: number) {
    const todo = await this.repository.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    await this.repository.delete(id);
  }
}
