"use client";

import TodoItem from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { useGetAllTodos } from "@/features/todo/query/useGetAllTodos";
import { isEmpty } from "@/utils/helpers";
import { CheckSquare, Plus } from "lucide-react";
import { useMemo } from "react";

export default function Home() {
  const { data: todoData, isLoading } = useGetAllTodos();

  const taskStatusTodo = useMemo(
    () => todoData?.filter((task) => task.status === "todo"),
    [todoData]
  );
  const taskStatusInProgress = useMemo(
    () => todoData?.filter((task) => task.status === "in-progress"),
    [todoData]
  );
  const taskStatusDone = useMemo(
    () => todoData?.filter((task) => task.status === "done"),
    [todoData]
  );

  return (
    <div className="mt-12">
      <div className="w-full h-full max-w-screen-xl mx-auto">
        {!isEmpty(todoData) ? (
          <div className="grid grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-200 mr-1" />
                <h2 className="text-lg font-semibold">To Do</h2>
                <span className="text-muted-foreground">(0)</span>
              </div>

              <div className="mt-5 grid gap-4">
                {!isEmpty(taskStatusTodo) &&
                  taskStatusTodo.map((todo) => <TodoItem key={todo.id} />)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1" />
                <h2 className="text-lg font-semibold">In Progress</h2>
                <span className="text-muted-foreground">(0)</span>
              </div>

              <div className="mt-5 grid gap-4">
                {!isEmpty(taskStatusInProgress) &&
                  taskStatusInProgress.map((todo) => (
                    <TodoItem key={todo.id} />
                  ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                <h2 className="text-lg font-semibold">Done</h2>
                <span className="text-muted-foreground">(0)</span>
              </div>

              <div className="mt-5 grid gap-4">
                {!isEmpty(taskStatusDone) &&
                  taskStatusDone.map((todo) => <TodoItem key={todo.id} />)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <CheckSquare className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold">No Tasks yet</h2>
            <p className="text-muted-foreground mb-5">
              Get started by creating your first task
            </p>
            <Button size="lg">
              <Plus /> Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
