import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskApiService } from "../client/task-api.service";
import { CreateTaskSchema } from "../schema/form-task.schema";
import { REACT_QUERY_CACHE_KEYS } from "@/constant/react-query-cache-keys";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskSchema) =>
      TaskApiService.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CACHE_KEYS.task],
      });
    },
  });
};
