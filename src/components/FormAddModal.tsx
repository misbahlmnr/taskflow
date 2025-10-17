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

const FormAddModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task to add to your list.
          </DialogDescription>
        </DialogHeader>
        <form action="" className="flex flex-col">
          <div className="grid gap-2 mb-3">
            <Label htmlFor="task">Task</Label>
            <Input id="task" type="text" placeholder="What needs to be done?" />
          </div>
          <Button type="submit" className="self-end mt-4">
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormAddModal;
