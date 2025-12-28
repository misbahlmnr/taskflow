import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import MatrixItem from "./matrix-item";
import { DevBadge } from "@/components/dev-badge";

const MatrixOverview = () => {
  return (
    <Card className="relative">
      <DevBadge />
      <CardHeader className="mt-2">
        <CardTitle className="mt-3">Matrix Overview</CardTitle>
        <CardAction>
          <Button variant="ghost">
            View <ArrowRight />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          <MatrixItem
            label="Do First"
            value={"0"}
            color="border-destructive/30"
            bgColor="bg-destructive/10"
          />

          <MatrixItem
            label="Schedule"
            value={"0"}
            color="border-primary/40"
            bgColor="bg-primary/10"
          />

          <MatrixItem
            label="Delegate"
            value={"0"}
            color="border-accent/30"
            bgColor="bg-accent/10"
          />

          <MatrixItem
            label="Eliminate"
            value={"0"}
            color="border-gray-200"
            bgColor="bg-gray-50"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MatrixOverview;
