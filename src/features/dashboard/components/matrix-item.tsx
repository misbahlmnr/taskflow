import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  color: string;
  bgColor: string;
};

const MatrixItem = ({ label, value, color, bgColor }: Props) => {
  return (
    <div className={cn("rounded-lg p-3 border", `${color} ${bgColor}`)}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <h3 className="text-xl font-semibold text-black">{value}</h3>
    </div>
  );
};

export default MatrixItem;
