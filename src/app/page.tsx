"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TodoList from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDeleteTodo } from "@/features/todo/mutation/useDeleteTodo";
import { useGetAllTodos } from "@/features/todo/query/useGetAllTodos";
import { useUpdateTodo } from "@/features/todo/mutation/useUpdateTodo";
import { cn } from "@/lib/utils";
import { isEmpty } from "@/utils/helpers";
import { Plus, ListTodo } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: todoData, isLoading, refetch } = useGetAllTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const sections = [
    { key: "todo", label: "To Do", color: "bg-gray-200" },
    { key: "in-progress", label: "In Progress", color: "bg-yellow-500" },
    { key: "done", label: "Done", color: "bg-green-500" },
  ];

  const groupedTasks = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        items: todoData?.filter((todo) => todo.status === section.key) || [],
      })),
    [todoData]
  );

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the droppable area or dropped in the same place
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the dragged task
    const draggedTask = todoData?.find((task) => task.id === draggableId);
    if (!draggedTask) return;

    // Update the task status based on the destination droppable
    updateTodo(
      {
        id: draggableId,
        payload: {
          ...draggedTask,
          status: destination.droppableId as "todo" | "in-progress" | "done",
        },
      },
      {
        onSuccess: () => {
          toast.success("Task status updated successfully!");
          // Refresh the data to ensure UI is in sync
          refetch();
        },
        onError: (error) => {
          toast.error("Failed to update task status", {
            description:
              error.message ||
              "An error occurred while updating the task status",
          });
        },
      }
    );
  };

  console.log("Data todo", todoData);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <Skeleton className="h-8 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div key={section.key} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", section.color)} />
                  <Skeleton className="h-5 w-1/2" />
                </div>

                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isEmpty(todoData)) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <ListTodo className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No tasks yet</h2>
          <p className="text-muted-foreground mb-6">
            Get started by creating your first task. Add a new task using the
            button above.
          </p>
          <div className="flex justify-center">
            <Button variant="outline" className="cursor-not-allowed opacity-50">
              <Plus className="mr-2" /> Add Task from Navbar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Task Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your tasks efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupedTasks.map((section) => (
              <div key={section.key} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", section.color)} />
                  <h2 className="text-lg font-semibold">{section.label}</h2>
                  <Badge variant="secondary" className="ml-auto">
                    {section.items.length}{" "}
                    {section.items.length === 1 ? "task" : "tasks"}
                  </Badge>
                </div>

                <TodoList
                  todos={section.items}
                  onItemDelete={handleDelete}
                  sectionKey={section.key}
                  isLoading={isLoading}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
