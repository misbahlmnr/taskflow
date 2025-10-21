import supabase from "@/lib/supabase";
import { Todo } from "@/types/todos";

export const createTodo = async (payload: Omit<Todo, "id">): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ 
      task: payload.task,
      status: payload.status,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating todo:', error);
    throw new Error(error.message || 'Failed to create todo');
  }

  return data as Todo;
};