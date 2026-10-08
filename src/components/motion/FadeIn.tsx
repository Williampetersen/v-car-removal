import { ReactNode } from "react";

// CSS-only reveal (see .reveal in globals.css): no client JavaScript.
export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
