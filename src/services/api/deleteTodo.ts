import supabase from "@/lib/supabase";

export const deleteTodo = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting todo:', error);
    throw new Error(error.message || 'Failed to delete todo');
  }
};