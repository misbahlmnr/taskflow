import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto", className)}>{children}</div>
  );
};

export default MaxWidthWrapper;
