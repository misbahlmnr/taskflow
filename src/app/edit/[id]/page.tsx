"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTodoById } from "@/features/todo/hooks/useGetTodoById";
import { useUpdateTodo } from "@/features/todo/hooks/useUpdateTodo";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TodoStatus } from "@/features/todo/type";

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

const EditTaskPage = ({ params }: EditTaskPageProps) => {
  const { id } = params;
  const router = useRouter();
  const { data: todo, isLoading, error } = useGetTodoById(id);
  const { mutate: updateTodo, isPending } = useUpdateTodo();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const task = formData.get("task") as string;
    const status = formData.get("status") as string;

    updateTodo(
      {
        id: todo.id,
        payload: {
          task,
          status: status as TodoStatus,
        },
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully!");
          router.push(`/task/${id}`); // Redirect back to the task detail page
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href={`/task/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} />
            <span>Back to Task</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Task</CardTitle>
            <p className="text-muted-foreground">
              Update the task details below
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="task">Task Title</Label>
                <Input
                  id="task"
                  name="task"
                  defaultValue={todo.task}
                  placeholder="Enter task title"
                  required
                  disabled={isPending}
                  className="text-lg py-5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" value={todo.status} disabled={isPending}>
                  <SelectTrigger id="status" className="text-base py-5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="todo" className="text-base">
                        To Do
                      </SelectItem>
                      <SelectItem value="in-progress" className="text-base">
                        In Progress
                      </SelectItem>
                      <SelectItem value="done" className="text-base">
                        Done
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  disabled={isPending}
                >
                  <Link href={`/task/${id}`}>Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditTaskPage;
