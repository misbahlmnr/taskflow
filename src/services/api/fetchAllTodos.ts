import supabase from "@/lib/supabase";
import { Todo } from "@/types/todos";

type TodoResponse = Todo;

export const fetchAllTodos = async (): Promise<TodoResponse[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
    throw new Error(error.message || 'Failed to fetch todos');
  }

  return data as TodoResponse[];
};