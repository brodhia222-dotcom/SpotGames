import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "platform" | "discount" | "retro" | "service" | "soldout" | "new";

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  platform: "border border-[rgba(10,10,10,0.18)] text-ink bg-transparent",
  discount: "bg-neon text-ink font-semibold",
  retro:    "bg-ink text-paper",
  service:  "bg-violet text-white",
  soldout:  "bg-grey-3 text-ink",
  new:      "bg-violet-soft text-violet-deep",
};

export function Badge({ variant = "platform", icon, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[2px]",
        "font-mono text-[11px] font-medium uppercase tracking-[0.12em]",
        "py-[5px] px-[10px]",
        variantClasses[variant],
        className
      )}
    >
      {icon && <span aria-hidden className="flex items-center shrink-0 -ml-0.5">{icon}</span>}
      {children}
    </span>
  );
}

export type { BadgeProps, BadgeVariant };
