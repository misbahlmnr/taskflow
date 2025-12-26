import { REACT_QUERY_CACHE_KEYS } from "@/constant/react-query-cache-keys";
import { useQuery } from "@tanstack/react-query";
import { TaskApiService } from "@/features/task/client/task-api.service";

export const useTask = () => {
  return useQuery({
    queryKey: [REACT_QUERY_CACHE_KEYS.task],
    queryFn: TaskApiService.getTasks,
  });
};
