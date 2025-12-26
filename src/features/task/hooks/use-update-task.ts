import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskApiService } from "@/features/task/client/task-api.service";
import { CreateTaskFormValues } from "@/features/task/schema/form-task.schema";
import { REACT_QUERY_CACHE_KEYS } from "@/constant/react-query-cache-keys";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskFormValues & { id: number }) =>
      TaskApiService.updateTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CACHE_KEYS.task],
      });
    },
  });
};
