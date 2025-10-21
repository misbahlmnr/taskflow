"use client";

import { CheckSquare } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import FormAddModal from "./FormAddModal";

const Navbar = () => {
  return (
    <header className="border-b">
      <MaxWidthWrapper className="flex items-center justify-between w-full h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 h-10 w-10 rounded-lg flex items-center justify-center shadow-md">
            <CheckSquare className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">TaskFlow</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FormAddModal />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
