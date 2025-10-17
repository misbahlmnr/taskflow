import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export const REACT_QUERY_CLIENT_KEY = {
  todos: "todos",
  "detail-todo": (id: number) => `detail-todo-${id}`,
};
