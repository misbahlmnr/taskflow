import { REACT_QUERY_CLIENT_KEY } from "@/lib/query-client";
import { fetchAllTodos } from "@/services/api/fetchAllTodos";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTodos = () => {
  return useQuery({
    queryKey: [REACT_QUERY_CLIENT_KEY.todos],
    queryFn: fetchAllTodos,
  });
};
