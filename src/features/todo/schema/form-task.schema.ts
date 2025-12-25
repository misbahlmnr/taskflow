import z from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).default("todo"),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
