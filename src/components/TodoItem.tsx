"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const TodoItem = () => {
  return (
    <Link href="/1">
      <Card className="py-[10px]">
        <CardContent>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold line-clamp-1">test</h3>
            <div className="grid gap-1 grid-cols-2">
              <Button
                size={"icon"}
                variant="ghost"
                className="hover:bg-blue-500 hover:text-white"
              >
                <Pencil size={20} />
              </Button>
              <Button
                size={"icon"}
                variant="ghost"
                className="hover:bg-red-100"
              >
                <Trash2 size={20} className="text-red-600" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <Badge className="bg-gray-300 text-gray-500">Todo</Badge>

            <Select value="todo">
              <SelectTrigger className="w-[140px]">
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default TodoItem;
