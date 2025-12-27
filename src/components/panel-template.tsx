import { ReactNode } from "react";

const PanelTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background">{children}</div>
  );
};

export default PanelTemplate;
