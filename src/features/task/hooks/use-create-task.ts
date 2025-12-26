import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskApiService } from "@/features/task/client/task-api.service";
import { REACT_QUERY_CACHE_KEYS } from "@/constant/react-query-cache-keys";
import { CreateTaskFormValues } from "@/features/task/schema/form-task.schema";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskFormValues) =>
      TaskApiService.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CACHE_KEYS.task],
      });
    },
  });
};
