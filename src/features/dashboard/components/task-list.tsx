"use client";

import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteTask } from "@/features/task/hooks/use-delete-task";
import { useTask } from "@/features/task/hooks/use-tasks";
import { isEmpty } from "@/lib/utils";

import TaskItem from "./task-item";

const TaskList = () => {
  const { data: tasks, isLoading } = useTask();
  const { mutate: deleteTask } = useDeleteTask();

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
        <div className="space-y-2 h-[200px] max-h-[350px] overflow-y-auto">
          {!isEmpty(tasks) ? (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
              <p className="text-base">No tasks here</p>
              <div className="text-sm text-muted-foreground">
                Add task to get started
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
