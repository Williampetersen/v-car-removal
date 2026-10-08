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
  "font-display shine inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base transition-all active:translate-y-px active:scale-[0.97]";

export function PrimaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      data-ripple
      data-magnetic
      className={`${base} bg-brand text-ink shadow-lg shadow-sky-500/30 hover:-translate-y-0.5 hover:bg-sky-300 hover:shadow-xl active:shadow-md ${className}`}
    >
      {children}
    </Link>
  );
}

export function DarkButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      data-ripple
      className={`${base} bg-sky-700 text-white hover:bg-sky-800 ${className}`}
    >
      {children}
    </Link>
  );
}

export function GhostButton({ href, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      data-ripple
      className={`${base} border-2 border-ink/20 text-ink hover:border-ink ${className}`}
    >
      {children}
    </Link>
  );
}

export function CallButton({
  className = "",
  variant = "onLight",
}: {
  className?: string;
  variant?: "onDark" | "onLight";
}) {
  const variantClasses =
    variant === "onDark"
      ? "border-2 border-white/40 text-white hover:border-white hover:bg-white/10"
      : "border-2 border-slate-300 bg-white text-slate-900 hover:border-sky-400 hover:bg-sky-50";

  return (
    <a
      href={site.phoneHref}
      data-ripple
      className={`${base} ${variantClasses} ${className}`}
    >
      <PhoneCall className="h-5 w-5" aria-hidden />
      Call {site.phoneDisplay}
    </a>
  );
}
