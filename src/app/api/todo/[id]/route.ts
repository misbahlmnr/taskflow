import { TodoService } from "@/features/todo/server/todo.service";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

const todoService = new TodoService();

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const todoId = Number(id);

  if (isNaN(todoId)) {
    return NextResponse.json(
      { message: "Invalid 'id' parameter" },
      { status: 400 }
    );
  }

  const task = await todoService.getTodoById(todoId);

  return NextResponse.json(task);
}
