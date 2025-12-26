import z from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).default("todo"),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]),
});

export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;
