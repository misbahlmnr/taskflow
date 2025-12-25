import { REACT_QUERY_CLIENT_KEY } from "@/lib/query-client";
import { getTodoById } from "@/services/api/getTodoById";
import { Todo } from "@/features/todo/type";
import { useQuery } from "@tanstack/react-query";

export const useGetTodoById = (id: string) => {
  return useQuery<Todo, Error>({
    queryKey: [REACT_QUERY_CLIENT_KEY.todos, id],
    queryFn: () => getTodoById(id),
    enabled: !!id,
  });
};
