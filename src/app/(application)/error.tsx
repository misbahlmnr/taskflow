"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type ReactNode } from "react";

export default function ErrorPage(): ReactNode {
  return (
    <MaxWidthWrapper>
      <h1>Something when wrong</h1>
      <p> We apologize for the inconvenience. Please try again later. 😔</p>
    </MaxWidthWrapper>
  );
}
