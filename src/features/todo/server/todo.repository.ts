import "server-only";
import { db } from "@/lib/drizzle";
import { todosTable } from "@/features/todo/schema/todo-table.schema";
import { eq } from "drizzle-orm";
import { InsertTodo, UpdateTodo } from "@/features/todo/type";

export class TodoRepository {
  findAll() {
    return db.select().from(todosTable);
  }

  async findById(id: number) {
    const [todo] = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id));

    return todo ?? null;
  }

  async create(data: InsertTodo) {
    const [todo] = await db.insert(todosTable).values(data).returning();

    return todo;
  }

  async update(id: number, data: Omit<UpdateTodo, "id">) {
    const [todo] = await db
      .update(todosTable)
      .set(data)
      .where(eq(todosTable.id, id))
      .returning();

    return todo ?? null;
  }

  delete(id: number) {
    return db.delete(todosTable).where(eq(todosTable.id, id));
  }
}
