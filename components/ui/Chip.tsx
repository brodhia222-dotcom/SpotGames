"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, useState } from "react";

type ChipVariant = "default" | "violet";

interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  variant?: ChipVariant;
  isActive?: boolean;
  onChange?: (active: boolean) => void;
}

const activeClasses: Record<ChipVariant, string> = {
  default: "bg-ink text-paper border-ink",
  violet: "bg-violet text-white border-violet",
};

const inactiveClasses: Record<ChipVariant, string> = {
  default: "bg-transparent text-ink border-[rgba(10,10,10,0.18)] hover:border-ink",
  violet: "bg-violet-soft text-violet border-transparent hover:border-violet/40",
};

export function Chip({
  variant = "default",
  isActive: controlledActive,
  onChange,
  className,
  children,
  onClick,
  ...props
}: ChipProps) {
  const reducedMotion = useReducedMotion();
  const isControlled = controlledActive !== undefined;
  const [internalActive, setInternalActive] = useState(false);

  const active = isControlled ? controlledActive : internalActive;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isControlled) setInternalActive((prev) => !prev);
    onChange?.(!active);
    onClick?.(e);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={!reducedMotion ? { scale: 0.95 } : undefined}
      className={cn(
        "inline-flex items-center h-7 px-3 rounded-full border font-mono text-[11px] uppercase tracking-widest",
        "transition-colors cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        active ? activeClasses[variant] : inactiveClasses[variant],
        className
      )}
      style={{
        transitionDuration: "var(--dur-fast)",
        transitionTimingFunction: "var(--ease-out)",
      }}
      aria-pressed={active}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
}
