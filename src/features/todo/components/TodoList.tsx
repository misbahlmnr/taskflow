"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Todo } from "@/features/todo/type";
import TodoItem from "./TodoItem";
import TodoItemSkeleton from "./TodoItemSkeleton";

interface TodoListProps {
  todos: Todo[];
  onItemDelete: (id: string) => void;
  sectionKey: string; // Identifier for the section (todo, in-progress, done)
  isLoading?: boolean; // Optional loading state
}

const TodoList = ({
  todos,
  onItemDelete,
  sectionKey,
  isLoading = false,
}: TodoListProps) => {
  // Define colors for each status when dragging over
  const getDragOverColor = () => {
    switch (sectionKey) {
      case "todo":
        return "border-gray-400 bg-gray-50";
      case "in-progress":
        return "border-yellow-400 bg-yellow-50";
      case "done":
        return "border-green-400 bg-green-50";
      default:
        return "border-gray-400 bg-gray-50";
    }
  };

  return (
    <Droppable droppableId={sectionKey}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`space-y-3 min-h-[80px] rounded-lg border-2 border-dashed p-4 transition-colors duration-200 ${
            snapshot.isDraggingOver
              ? `${getDragOverColor()} shadow-inner`
              : "border-gray-200 bg-gray-50"
          }`}
        >
          {isLoading ? (
            // Show skeleton loaders when loading
            Array.from({ length: 3 }).map((_, index) => (
              <TodoItemSkeleton key={`skeleton-${index}`} />
            ))
          ) : todos.length > 0 ? (
            todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-white"
                  >
                    <TodoItem
                      todo={todo}
                      onDelete={onItemDelete}
                      isDragging={snapshot.isDragging}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))
          ) : (
            <div className="flex items-center justify-center text-muted-foreground py-8">
              <p className="text-sm md:text-base">No tasks here</p>
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
