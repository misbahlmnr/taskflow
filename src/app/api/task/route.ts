import { NextResponse } from "next/server";
import { z } from "zod";

import { createTaskSchema, updateTaskSchema } from "@/features/task/schema/form-task.schema";
import { TaskService } from "@/features/task/server/task.service";

const taskService = new TaskService();

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = CreateTaskDto & { id: number };
// export type UpdateStatusDto = z.infer<typeof updateStatusSchema>;

export async function GET() {
  const data = await taskService.getTasks();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = createTaskSchema.parse(await request.json());
    const task = await taskService.createTask(body);

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = updateTaskSchema
      .extend({ id: z.number() })
      .parse(await request.json());
    const todo = await taskService.updateTask(body);

    return NextResponse.json(todo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      {
        message: "Invalid or missing 'id' parameter",
      },
      { status: 400 },
    );
  }

  await taskService.deleteTask(Number(id));

  return NextResponse.json(
    { message: "Todo deleted successfully" },
    { status: 200 },
  );
}

export async function PATCH(request: Request) {
  try {
    const body = updateStatusSchema.parse(await request.json());
    const res = await taskService.updateStatus(body);

    return NextResponse.json({
      message: "Status updated successfully",
      data: res,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
