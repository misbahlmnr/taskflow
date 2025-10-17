import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";

const TodoDetail = () => {
  return (
    <MaxWidthWrapper className="max-w-screen-md">
      <Link href="/">
        <Button
          variant="ghost"
          className="mb-5 hover:bg-primary/90 hover:text-white"
        >
          <ArrowLeft /> Back to Tasks
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
          <CardDescription>Update task details and status</CardDescription>
          <CardAction>
            <Badge className="bg-gray-300 text-gray-500">Todo</Badge>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form action="">
            <div className="grid gap-2 mb-3">
              <Label htmlFor="task">Task</Label>
              <Input id="task" type="text" defaultValue="Input your task" />
            </div>
            <div className="grid gap-2 mb-8">
              <Label htmlFor="status">Status</Label>
              <Select value="todo">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <Button type="submit">
                <Save />
                Save Changes
              </Button>
              <Button type="submit" className="bg-red-500 hover:bg-red-500/90">
                <Trash2 />
                Delete Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};

export default TodoDetail;
