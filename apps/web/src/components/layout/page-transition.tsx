"use client";
import type { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  return <div className="page-fade-in">{children}</div>;
};
