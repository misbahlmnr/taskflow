import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/features/task/store/task-store";
import { Task } from "@/features/task/type";

const TaskItem = ({
  task,
  deleteTask,
}: {
  task: Task;
  deleteTask: (id: number) => void;
}) => {
  const { openTask } = useTaskStore();

  return (
    <div 
      className="p-4 border flex justify-between items-center rounded-lg group hover:cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => openTask(task)}
    >
      <div className="flex gap-2 items-center">
        <div>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <div className="w-5 h-5 rounded-full border-2 border-primary"></div>
          </Button>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium flex items-center gap-2">
            {task.title}{" "}
            <span className="block w-2 h-2 bg-primary rounded-full" />
          </div>
          <div className="text-xs text-muted-foreground">Today</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(Number(task.id));
          }}
          className="hover:bg-red-50 hover:text-red-600 text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
