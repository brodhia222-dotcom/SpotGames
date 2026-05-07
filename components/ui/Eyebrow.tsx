import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowAccent = "neon" | "violet";

interface EyebrowProps {
  accent?: EyebrowAccent;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

export function Eyebrow({
  accent = "neon",
  dot = true,
  className,
  children,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        "font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-grey-1",
        className
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={cn(
            "inline-block w-1.5 h-1.5 rounded-full shrink-0",
            accent === "neon" ? "bg-neon" : "bg-violet"
          )}
        />
      )}
      {children}
    </span>
  );
}

export type { EyebrowProps, EyebrowAccent };
