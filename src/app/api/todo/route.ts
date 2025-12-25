import { z } from "zod";
import { TodoService } from "@/features/todo/server/todo.service";
import { NextResponse } from "next/server";

const todoService = new TodoService();

const createTodoSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  status: z.enum(["todo", "in-progress", "done"]).default("todo"),
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
export type UpdateTodoDto = CreateTodoDto & { id: number };

export async function GET() {
  const data = await todoService.getTodos();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = createTodoSchema.parse(await request.json());
  const todo = await todoService.createTodo(body);

  return NextResponse.json(todo, { status: 201 });
}

export async function PUT(request: Request) {
  const body = createTodoSchema
    .extend({ id: z.number() })
    .parse(await request.json());
  const todo = await todoService.updateTodo(body);

  return NextResponse.json(todo);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      {
        message: "Invalid or missing 'id' parameter",
      },
      { status: 400 }
    );
  }

  await todoService.deleteTodo(Number(id));

  return NextResponse.json(
    { message: "Todo deleted successfully" },
    { status: 200 }
  );
}
