import { ReactNode } from "react";

// Plain wrapper: scroll animations were removed because they delayed Largest Contentful Paint.
export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <div className={className}>{children}</div>;
}
