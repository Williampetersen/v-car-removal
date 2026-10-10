import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function PrimaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-ink sm:px-6 sm:py-3.5 sm:text-base shadow-[0_8px_24px_-6px_rgba(255,210,63,0.55)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_-6px_rgba(255,210,63,0.65)] active:translate-y-0 ${className}`}
    >
      {children}
    </Link>
  );
}

export function DarkButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-bold text-white sm:px-6 sm:py-3.5 sm:text-base transition-all hover:-translate-y-0.5 hover:bg-ink-soft active:translate-y-0 ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-ink/15 px-5 py-3 text-sm font-bold text-ink sm:px-6 sm:py-3.5 sm:text-base transition-all hover:-translate-y-0.5 hover:border-ink active:translate-y-0 ${className}`}
    >
      {children}
    </Link>
  );
}

export { CallButton, EmailButton } from "./CallButton";
