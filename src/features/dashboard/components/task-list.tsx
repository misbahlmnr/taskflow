import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import TaskItem from "./task-item";

const TaskList = () => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="p-2 rounded-lg bg-primary/10 max-w-max">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <span>{"Today's Focus"}</span>
        </CardTitle>
        <CardAction>
          <Button variant="ghost">Add Task</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
