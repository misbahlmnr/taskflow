import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TodoItemSkeleton = () => {
  return (
    <Card className="shadow-sm">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <Skeleton className="h-4 w-4 rounded-sm mt-1" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="flex space-x-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
      </div>
    </Card>
  );
};

export default TodoItemSkeleton;
