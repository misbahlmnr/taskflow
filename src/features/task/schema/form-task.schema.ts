import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priorityQuadrant: z.enum(["do-first", "delegate", "schedule", "eliminate"]),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priorityQuadrant: z.enum(["do-first", "delegate", "schedule", "eliminate"]),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;
