import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskApiService } from "@/features/task/client/task-api.service";
import { REACT_QUERY_CACHE_KEYS } from "@/constant/react-query-cache-keys";

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: number; status: string }) =>
      TaskApiService.updateStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_CACHE_KEYS.task],
      });
    },
  });
};
