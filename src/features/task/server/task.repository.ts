import "server-only";
import { db } from "@/lib/drizzle";
import { tasksTable } from "@/features/task/db/task-table.schema";
import { eq } from "drizzle-orm";
import { InsertTask, UpdateTask } from "@/features/task/type";

export class TaskRepository {
  findAll() {
    return db.select().from(tasksTable);
  }

  async findById(id: number) {
    const [todo] = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));

    return todo ?? null;
  }

  async create(data: InsertTask) {
    const [todo] = await db.insert(tasksTable).values(data).returning();

    return todo;
  }

  async update(id: number, data: Omit<UpdateTask, "id">) {
    const [todo] = await db
      .update(tasksTable)
      .set(data)
      .where(eq(tasksTable.id, id))
      .returning();

    return todo ?? null;
  }

  delete(id: number) {
    return db.delete(tasksTable).where(eq(tasksTable.id, id));
  }
}
