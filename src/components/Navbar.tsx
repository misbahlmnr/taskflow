"use client";

import { CheckSquare } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import FormAddModal from "./FormAddModal";

const Navbar = () => {
  return (
    <header className="h-[80px] flex items-center">
      <MaxWidthWrapper className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <div className="bg-blue-500 h-10 w-10 rounded-md flex items-center justify-center ">
            <CheckSquare className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Task</h1>
            <span className="text-sm text-muted-foreground">3 tasks total</span>
          </div>
        </div>
        <FormAddModal />
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
