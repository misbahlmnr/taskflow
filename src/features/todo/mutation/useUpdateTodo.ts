import { queryClient, REACT_QUERY_CLIENT_KEY } from "@/lib/query-client";
import { updateTodo } from "@/services/api/updateTodo";
import { Todo } from "@/types/todos";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTodo = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Todo> }) => 
      updateTodo(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CLIENT_KEY.todos],
      });
      toast.success("Task updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update task", {
        description: error.message || "An error occurred while updating the task",
      });
    },
  });
};