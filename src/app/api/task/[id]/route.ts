import { TaskService } from "@/features/task/server/task.service";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

const taskService = new TaskService();

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const todoId = Number(id);

  if (isNaN(todoId)) {
    return NextResponse.json(
      { message: "Invalid 'id' parameter" },
      { status: 400 }
    );
  }

  const task = await taskService.getTaskById(todoId);

  return NextResponse.json(task);
}
