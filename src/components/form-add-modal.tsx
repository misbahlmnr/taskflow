"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
// import { useCreateTodo } from "@/features/todo/hooks/useCreateTask";
import { useState } from "react";
import { useCreateTask } from "@/features/task/hooks/use-create-task";

const FormAddModal = () => {
  const [task, setTask] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { mutate: createTask, isPending } = useCreateTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask(
      {
        name: task,
        status: "todo",
      },
      {
        onSuccess: () => {
          setTask(""); // Clear the input field
          setOpen(false); // Close the dialog
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-sm md:text-base">
          <Plus size={16} /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list. You can edit it later.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="task">Task Title</Label>
            <Input
              id="task"
              type="text"
              placeholder="Enter task title..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              disabled={isPending}
              autoFocus
              className="py-5 md:text-base text-sm"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>Adding...</span>
                </div>
              ) : (
                "Add Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormAddModal;
