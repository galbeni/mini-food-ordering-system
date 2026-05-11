import type { ReactNode } from "react";
import { PageTransition } from "@/components/layout/page-transition";

type TemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: TemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
