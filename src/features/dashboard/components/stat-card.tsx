import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  label: string;
  value: string;
  bgColor: string;
  color: string;
};

const StatCard = ({ Icon, label, value, bgColor, color }: Props) => {
  return (
    <div className="stat-card">
      <div className="flex items-center gap-3">
        <div className={cn("p-2.5 rounded-lg", bgColor)}>
          <Icon className={cn("h-5 w-5", color)} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
