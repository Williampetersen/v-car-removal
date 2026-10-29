import { ReactNode } from "react";

// Scroll  is applied by the Effects script (below-the-fold only), so it never delays first paint.
export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <div className={`${className}`}>{children}</div>;
}
