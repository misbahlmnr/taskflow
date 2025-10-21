import supabase from "@/lib/supabase";
import { Todo } from "@/types/todos";

export const updateTodo = async (id: string, payload: Partial<Todo>): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    throw new Error(error.message || 'Failed to update todo');
  }

  return data as Todo;
};