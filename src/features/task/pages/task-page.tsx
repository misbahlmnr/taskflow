"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TodoList from "@/features/task/components/task-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, isEmpty } from "@/lib/utils";
import { Plus, ListTodo } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/features/task/type";
import { useTask } from "@/features/task/hooks/use-tasks";
import { useUpdateTask } from "@/features/task/hooks/use-update-task";
import { useDeleteTask } from "../hooks/use-delete-task";

export default function TodoPage() {
  const [taskLists, setTaskLists] = useState<Task[]>([]);

  const { data: taskData, isLoading, refetch } = useTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  useEffect(() => {
    if (taskData) {
      setTaskLists(taskData);
    }
  }, [taskData]);

  const sections = [
    { key: "todo", label: "To Do", color: "bg-gray-200" },
    { key: "in-progress", label: "In Progress", color: "bg-yellow-500" },
    { key: "done", label: "Done", color: "bg-green-500" },
  ];

  const groupedTasks = useMemo(
    () =>
      sections.map((section) => ({
        ...section,
        items: taskLists.filter((todo) => todo.status === section.key),
      })),
    [taskLists]
  );

  const handleDelete = (id: string) => {
    console.log("ok");
    deleteTask(id, {
      onSuccess: () => {
        setTaskLists((prev) => prev.filter((t) => t.id !== id));
        toast.success("Task deleted successfully");
      },
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = taskLists.find((task) => task.id === draggableId);
    if (!draggedTask) return;

    const newStatus = destination.droppableId as
      | "todo"
      | "in-progress"
      | "done";

    // Update UI in local state
    setTaskLists((prev) =>
      prev.map((task) =>
        task.id === draggableId ? { ...task, status: newStatus } : task
      )
    );

    // Update in server
    updateTask(
      {
        id: draggableId,
        payload: { ...draggedTask, status: newStatus },
      },
      {
        onSuccess: () => {
          toast.success("Task status updated successfully!");
          refetch(); // tetap sync data terbaru dari server
        },
        onError: (error) => {
          toast.error("Failed to update task status", {
            description: error.message || "An error occurred.",
          });

          // Revert status in local state on error
          setTaskLists((prev) =>
            prev.map((task) =>
              task.id === draggableId
                ? { ...task, status: draggedTask.status }
                : task
            )
          );
        },
      }
    );
  };

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

  if (isEmpty(taskLists)) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <ListTodo className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-lg md:text-2xl font-bold mb-2">No tasks yet</h2>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Get started by creating your first task. Add a new task using the
            button above.
          </p>
          <Button variant="outline" className="cursor-not-allowed opacity-50">
            <Plus className="mr-2" /> Add Task from Navbar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-xl md:text-3xl font-bold">Task Lists</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage your tasks efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupedTasks.map((section) => (
              <div key={section.key} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", section.color)} />
                  <h2 className="text-sm md:text-lg font-semibold">
                    {section.label}
                  </h2>
                  <Badge variant="secondary" className="ml-auto">
                    {section.items.length}{" "}
                    {section.items.length === 1 ? "task" : "tasks"}
                  </Badge>
                </div>

                <TodoList
                  tasks={section.items}
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
