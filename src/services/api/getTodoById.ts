import supabase from "@/lib/supabase";
import { Todo } from "@/types/todos";

export const getTodoById = async (id: string): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching todo by id:', error);
    throw new Error(error.message || 'Failed to fetch todo');
  }

  return data as Todo;
};