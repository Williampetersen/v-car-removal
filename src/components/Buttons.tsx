import Link from "next/link";
import { ReactNode } from "react";
import { PhoneCall } from "./Icons";
import { site } from "@/lib/site";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

const base =
  "font-display inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-lg uppercase tracking-wide transition-all active:translate-y-px";

export function PrimaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} bg-brand text-ink shadow-[0_6px_0_0_#a63a05] hover:-translate-y-0.5 hover:bg-[#ff7d35] hover:shadow-[0_8px_0_0_#a63a05] active:shadow-[0_3px_0_0_#a63a05] ${className}`}
    >
      {children}
    </Link>
  );
}

export function DarkButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} bg-ink text-white hover:bg-ink-soft ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} border-2 border-ink/20 text-ink hover:border-ink ${className}`}
    >
      {children}
    </Link>
  );
}

export function CallButton({
  className = "",
  variant = "onDark",
}: {
  className?: string;
  variant?: "onDark" | "onLight";
}) {
  const variantClasses =
    variant === "onDark"
      ? "border-2 border-white/25 text-white hover:border-white hover:bg-white/10"
      : "border-2 border-ink text-ink hover:bg-ink hover:text-white";

  return (
    <a
      href={site.phoneHref}
      className={`${base} ${variantClasses} ${className}`}
    >
      <PhoneCall className="h-5 w-5" aria-hidden />
      Call {site.phoneDisplay}
    </a>
  );
}
