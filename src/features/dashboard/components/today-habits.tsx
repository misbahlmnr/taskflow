import { DevBadge } from "@/components/dev-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const TodayHabits = () => {
  return (
    <Card className="relative">
      <DevBadge />
      <CardHeader className="mt-2">
        <CardTitle className="mt-3">Todays Habits</CardTitle>
        <CardAction>
          <Button variant="ghost">
            View <ArrowRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-sm">
          No Habits tracked yet
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayHabits;
