import { queryClient, REACT_QUERY_CLIENT_KEY } from "@/lib/query-client";
import { createTodo } from "@/services/api/createTodo";
import { Todo } from "@/types/todos";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: (payload: Omit<Todo, "id">) => createTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CLIENT_KEY.todos],
      });
      toast.success("Task created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create task", {
        description: error.message || "An error occurred while creating the task",
      });
    },
  });
};
