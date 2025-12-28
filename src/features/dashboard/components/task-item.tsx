import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const TaskItem = () => {
  return (
    <div className="p-4 border flex justify-between items-center rounded-lg group hover:cursor-pointer">
      <div className="flex gap-2 items-center">
        <div>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <div className="w-5 h-5 rounded-full border-2 border-primary"></div>
          </Button>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium flex items-center gap-2">
            Testes <span className="block w-2 h-2 bg-primary rounded-full" />
          </div>
          <div className="text-xs text-muted-foreground">Today</div>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default TaskItem;
