import { REACT_QUERY_CACHE_KEYS } from "@/constant/react-query-cache-keys";
import { useQuery } from "@tanstack/react-query";
import { TaskApiService } from "../client/task-api.service";

export const useTaksById = (taskId: number) => {
  return useQuery({
    queryKey: [REACT_QUERY_CACHE_KEYS.detailTask(taskId)],
    queryFn: () => TaskApiService.getTaskById(taskId),
  });
};
