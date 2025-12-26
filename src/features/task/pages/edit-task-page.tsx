"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTaksById } from "@/features/task/hooks/use-task-by-id";
import { useUpdateTask } from "@/features/task/hooks/use-update-task";
import {
  updateTaskSchema,
  UpdateTaskFormValues,
} from "@/features/task/schema/form-task.schema";

const EditTaskPage = () => {
  const params = useParams();
  const taskId = Number(params?.id);
  const router = useRouter();

  const { data: task, isLoading, error } = useTaksById(taskId);
  const { mutate: updateTask, isPending } = useUpdateTask();

  const form = useForm<UpdateTaskFormValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      name: task?.name || "",
      description: task?.description || "",
      status: task?.status || "todo",
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading task...</p>
      </div>
    );
  }

  if (error || !task) {
    router.push("/");
    return null;
  }

  function onSubmit(values: UpdateTaskFormValues) {
    updateTask(
      { id: task?.id, ...values },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          router.push(`/task/${taskId}`);
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl mx-auto px-4">
        <Link
          href={`/task/${taskId}`}
          className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Task
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Task Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Task Title</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Enter task title"
                        disabled={isPending}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Status */}
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    console.log("status", field.value);
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Status</FieldLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          disabled={isPending}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder={"Select status"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="in-progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" asChild disabled={isPending}>
                  <Link href={`/task/${taskId}`}>Cancel</Link>
                </Button>
                <Button type="submit" disabled={isPending}>
                  <Save size={16} className="mr-2" />
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
