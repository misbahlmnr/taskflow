import { queryClient, REACT_QUERY_CLIENT_KEY } from "@/lib/query-client";
import { updateTodo } from "@/services/api/updateTodo";
import { Todo } from "@/types/todos";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTodoStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      updateTodo(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CLIENT_KEY.todos],
      });
      // Success toast will be handled by the calling component if needed
    },
    onError: (error) => {
      toast.error("Failed to update task status", {
        description: error.message || "An error occurred while updating the task status",
      });
    },
  });
};