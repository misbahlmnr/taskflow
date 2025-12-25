import { TodoService } from "@/features/todo/server/todo.service";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

const todoService = new TodoService();

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Invalid 'id' parameter" },
      { status: 400 }
    );
  }

  const task = await todoService.getTodoById(id);

  return NextResponse.json(task);
}
