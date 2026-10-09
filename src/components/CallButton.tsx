"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedPhone } from "./AnimatedPhone";
import { Mail } from "./Icons";
import { site } from "@/lib/site";

type Variant = "onDark" | "onLight" | "outline";
type Size = "md" | "sm";

const variantClasses: Record<Variant, string> = {
  onDark:
    "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-brand hover:bg-white/15",
  onLight: "bg-ink text-white hover:bg-ink-soft",
  outline:
    "border-2 border-ink/15 bg-white text-ink hover:border-ink",
};

function ActionButton({
  href,
  icon,
  label,
  text,
  variant,
  size,
  className,
  textClassName,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  text: string;
  variant: Variant;
  size: Size;
  className: string;
  textClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const small = size === "sm";
  const outline = variant === "outline";

  return (
    <motion.a
      href={href}
      whileHover={reduceMotion ? undefined : { y: small ? -2 : -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className={`group relative inline-flex items-center rounded-full text-left transition-colors ${
        small ? "gap-2.5 p-1 pr-5" : "gap-3.5 p-1.5 pr-7"
      } ${variantClasses[variant]} ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        <span
          className={`absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-[520%] ${
            outline ? "bg-brand/30" : "bg-white/20"
          }`}
        />
      </span>

      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 ${
          small ? "h-9 w-9" : "h-12 w-12"
        } ${
          outline
            ? "bg-ink text-brand shadow-ink/20"
            : "bg-brand text-ink shadow-brand/30"
        }`}
      >
        {icon}
      </span>

      <span className="relative flex min-w-0 flex-col leading-tight">
        {!small && (
          <span
            className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.15em] ${
              outline ? "text-brand-dark" : "text-brand"
            }`}
          >
            {label}
          </span>
        )}
        <span
          className={
            textClassName ??
            `font-display font-bold tracking-tight ${small ? "text-sm" : "text-lg"}`
          }
        >
          {text}
        </span>
      </span>
    </motion.a>
  );
}

export function CallButton({
  className = "",
  variant = "onDark",
  size = "md",
}: {
  className?: string;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <ActionButton
      href={site.phoneHref}
      icon={
        <AnimatedPhone
          className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
          ringClassName={variant === "outline" ? "bg-brand/40" : "bg-ink/25"}
        />
      }
      label="Call now"
      text={site.phoneDisplay}
      variant={variant}
      size={size}
      className={className}
    />
  );
}

export function EmailButton({
  className = "",
  variant = "onDark",
  size = "md",
}: {
  className?: string;
  variant?: Variant;
  size?: Size;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <ActionButton
      href={`mailto:${site.email}`}
      icon={
        <motion.span
          className="flex"
          animate={reduceMotion ? undefined : { y: [0, -2, 0], rotate: [0, -4, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
        >
          <Mail className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} aria-hidden />
        </motion.span>
      }
      label="Email us"
      text={site.email}
      variant={variant}
      size={size}
      className={className}
      textClassName={`truncate font-display font-bold tracking-tight ${
        size === "sm" ? "text-sm" : "text-base"
      }`}
    />
  );
}
