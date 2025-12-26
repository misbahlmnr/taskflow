"use client";

import { CheckSquare } from "lucide-react";
import MaxWidthWrapper from "./max-width-wrapper";
import FormAddModal from "./form-add-modal";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-b">
      <MaxWidthWrapper className="flex items-center justify-between w-full h-16 px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-blue-500 h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center shadow-md">
            <CheckSquare className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base md:text-xl font-bold">TaskFlow</h1>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <FormAddModal />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
