import { queryClient, REACT_QUERY_CLIENT_KEY } from "@/lib/query-client";
import { deleteTodo } from "@/services/api/deleteTodo";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CLIENT_KEY.todos],
      });
      toast.success("Task deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete task", {
        description:
          error.message || "An error occurred while deleting the task",
      });
    },
  });
};
