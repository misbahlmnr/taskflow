import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { useCreateTask } from "@/features/task/hooks/use-create-task";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

const formAddTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priorityQuadrant: z.enum(["do-first", "delegate", "schedule", "eliminate"]),
  date: z.date().optional(),
  tags: z.array(z.string()).optional(),
});

type FormAddTaskValues = z.infer<typeof formAddTaskSchema>;

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalFormAddTask = ({ isOpen, onOpenChange }: Props) => {
  const [tagInput, setTagInput] = useState<string>("");

  const { mutate: createTask, isPending } = useCreateTask();

  const form = useForm<FormAddTaskValues>({
    resolver: zodResolver(formAddTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priorityQuadrant: "do-first",
      date: undefined,
      tags: [],
    },
  });

  const onSubmit = (payload: FormAddTaskValues) => {
    createTask(payload, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-5">
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Task Title</FieldLabel>
                  <Input
                    {...field}
                    id="task"
                    type="text"
                    placeholder="Type task title"
                    disabled={isPending}
                    autoFocus
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Type task description"
                    disabled={isPending}
                    rows={5}
                  />
                </Field>
              )}
            />

            <Controller
              name="priorityQuadrant"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Priority Quadrant</FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Do First */}
                    <label
                      className={`relative flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 group ${
                        field.value === "do-first"
                          ? "bg-red-50 border-red-300 hover:bg-red-50/50 hover:border-red-200"
                          : "bg-red-50/50 border-transparent hover:border-red-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="do-first"
                        checked={field.value === "do-first"}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 group-hover:bg-red-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Do First
                      </span>
                    </label>

                    {/* Schedule */}
                    <label
                      className={`relative flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 group ${
                        field.value === "schedule"
                          ? "bg-cyan-50 border-cyan-300 hover:bg-cyan-50/50 hover:border-cyan-200"
                          : "bg-cyan-50/50 border-transparent hover:border-cyan-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="schedule"
                        checked={field.value === "schedule"}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 group-hover:bg-cyan-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Schedule
                      </span>
                    </label>

                    {/* Delegate */}
                    <label
                      className={`relative flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 group ${
                        field.value === "delegate"
                          ? "bg-yellow-50 border-yellow-300 hover:bg-yellow-50/50 hover:border-yellow-200"
                          : "bg-yellow-50/50 border-transparent hover:border-yellow-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="delegate"
                        checked={field.value === "delegate"}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0 group-hover:bg-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Delegate
                      </span>
                    </label>

                    {/* Eliminate */}
                    <label
                      className={`relative flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 group ${
                        field.value === "eliminate"
                          ? "bg-gray-50 border-gray-300 hover:bg-gray-50/50 hover:border-gray-200"
                          : "bg-gray-50/50 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="eliminate"
                        checked={field.value === "eliminate"}
                        onChange={field.onChange}
                        className="sr-only"
                      />
                      <span className="w-2 h-2 rounded-full bg-gray-500 shrink-0 group-hover:bg-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Eliminate
                      </span>
                    </label>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CalendarIcon className="size-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => {
                const addTag = () => {
                  const trimmedTag = tagInput.trim();
                  if (trimmedTag && !field.value?.includes(trimmedTag)) {
                    field.onChange([...(field.value || []), trimmedTag]);
                    setTagInput("");
                  }
                };

                const removeTag = (tagToRemove: string) => {
                  field.onChange(
                    field.value?.filter((tag) => tag !== tagToRemove) || [],
                  );
                };

                const handleKeyDown = (
                  e: React.KeyboardEvent<HTMLInputElement>,
                ) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                };

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Tags</FieldLabel>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Type tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isPending}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addTag}
                        disabled={isPending || !tagInput.trim()}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </div>
                    {field.value && field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((tag) => (
                          <div
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              disabled={isPending}
                              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <div className="mt-5 flex justify-between items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="w-[49%]"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="w-[49%]">
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
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

export default ModalFormAddTask;
