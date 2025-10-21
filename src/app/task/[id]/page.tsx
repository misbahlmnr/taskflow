"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTodoById } from "@/features/todo/query/useGetTodoById";
import { useDeleteTodo } from "@/features/todo/mutation/useDeleteTodo";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2, Calendar, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUpdateTodoStatus } from "@/features/todo/mutation/useUpdateTodoStatus";
import { useRouter } from "next/navigation";

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

const TaskDetailPage = ({ params }: TaskDetailPageProps) => {
  const { id } = params;
  const router = useRouter();
  const { data: todo, isLoading, error } = useGetTodoById(id);
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const { mutate: updateStatus } = useUpdateTodoStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3"></div>
          <p className="text-muted-foreground">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error || !todo) {
    // Instead of notFound(), redirect to home
    router.push("/");
    return null; // This will never be reached due to redirect, but added to satisfy TypeScript
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
      deleteTodo(id, {
        onSuccess: () => {
          toast.success("Task deleted successfully!");
          router.push("/"); // Redirect to home after deletion
        }
      });
    }
  };

  const handleStatusChange = (newStatus: string) => {
    updateStatus({ 
      id: todo.id, 
      status: newStatus 
    }, {
      onError: () => {
        toast.error("Failed to update status");
      }
    });
  };

  // Function to get badge info based on status
  const getStatusInfo = () => {
    switch (todo.status) {
      case "todo":
        return { label: "To Do", color: "bg-gray-100 text-gray-800", ring: "ring-gray-500" };
      case "in-progress":
        return { label: "In Progress", color: "bg-yellow-100 text-yellow-800", ring: "ring-yellow-500" };
      case "done":
        return { label: "Done", color: "bg-green-100 text-green-800", ring: "ring-green-500" };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800", ring: "ring-gray-500" };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft size={16} />
            <span>Back to Tasks</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl">{todo.task}</CardTitle>
              </div>
              <div className="flex gap-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  disabled={isDeleting}
                >
                  <Link href={`/edit/${todo.id}`} className="flex items-center gap-2">
                    <Pencil size={16} /> Edit
                  </Link>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} /> {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <Badge className={`${statusInfo.color} ${statusInfo.ring} ring-1`}>
                {statusInfo.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Task ID</p>
                  <p className="font-mono text-sm">{todo.id}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
                  <div className="flex items-center gap-3 mt-1">
                    <select
                      value={todo.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm bg-background w-full"
                      disabled={isDeleting}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetailPage;