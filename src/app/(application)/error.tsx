"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type ReactNode } from "react";

export default function ErrorPage(): ReactNode {
  return (
    <MaxWidthWrapper className="w-full h-screen flex flex-col items-center justify-center space-y-2">
      <h1 className="text-3xl font-semibold">Something when wrong</h1>
      <p> We apologize for the inconvenience. Please try again later. 😔</p>
    </MaxWidthWrapper>
  );
}
