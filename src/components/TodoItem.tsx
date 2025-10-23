/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "@/types/todos";
import { useUpdateTodoStatus } from "@/features/todo/mutation/useUpdateTodoStatus";
import Link from "next/link";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  // Drag and drop props
  isDragging?: boolean;
  dragHandleProps?: any;
}

const TodoItem = ({
  todo,
  onDelete,
  isDragging,
  dragHandleProps,
}: TodoItemProps) => {
  const { mutate: updateStatus, isPending } = useUpdateTodoStatus();

  const getStatusInfo = () => {
    switch (todo.status) {
      case "todo":
        return {
          label: "To Do",
          color: "bg-gray-100 text-gray-800",
          ring: "ring-gray-500",
        };
      case "in-progress":
        return {
          label: "In Progress",
          color: "bg-yellow-100 text-yellow-800",
          ring: "ring-yellow-500",
        };
      case "done":
        return {
          label: "Done",
          color: "bg-green-100 text-green-800",
          ring: "ring-green-500",
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-800",
          ring: "ring-gray-500",
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleStatusChange = (value: string) => {
    updateStatus({
      id: todo.id,
      status: value,
    });
  };

  return (
    <Card
      className={`shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? "shadow-lg rotate-1" : ""
      }`}
    >
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100 transition-opacity"
            >
              <GripVertical size={16} className="text-gray-500" />
            </div>
            <Link href={`/task/${todo.id}`} className="flex-1 min-w-0">
              <h3 className="font-medium text-sm md:text-base line-clamp-2 hover:text-blue-600 cursor-pointer">
                {todo.task}
              </h3>
            </Link>
          </div>
          <div className="flex space-x-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Edit Task"
              asChild
              disabled={isPending}
            >
              <Link href={`/edit/${todo.id}`}>
                <Pencil size={16} />
              </Link>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
              aria-label="Delete Task"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash2 size={16} className="text-red-500" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Badge
            variant="secondary"
            className={`${statusInfo.color} ${statusInfo.ring} ring-1`}
          >
            {statusInfo.label}
          </Badge>

          <Select
            value={todo.status}
            onValueChange={handleStatusChange}
            disabled={isPending}
          >
            <SelectTrigger className="h-8 w-32 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="todo" className="text-xs">
                  To Do
                </SelectItem>
                <SelectItem value="in-progress" className="text-xs">
                  In Progress
                </SelectItem>
                <SelectItem value="done" className="text-xs">
                  Done
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
