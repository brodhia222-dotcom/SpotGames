import { cn } from "@/lib/utils";

type StatAccent = "neon" | "violet" | "none";
type StatSize = "sm" | "md" | "lg";

interface StatBlockProps {
  value: string;
  label: string;
  accent?: StatAccent;
  size?: StatSize;
  inverted?: boolean;
  className?: string;
}

const sizeClasses: Record<StatSize, string> = {
  sm: "text-2xl",
  md: "text-[2.5rem]",
  lg: "text-6xl",
};

export function StatBlock({
  value,
  label,
  accent = "none",
  size = "md",
  inverted = false,
  className,
}: StatBlockProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative inline-block self-start">
        <span
          className={cn(
            "font-display font-bold tracking-tight leading-none",
            sizeClasses[size],
            inverted ? "text-paper" : "text-ink"
          )}
        >
          {value}
        </span>
        {accent !== "none" && (
          <span
            aria-hidden
            className={cn(
              "absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full",
              accent === "neon" ? "bg-neon" : "bg-violet"
            )}
          />
        )}
      </div>
      <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-grey-2">
        {label}
      </span>
    </div>
  );
}

export type { StatBlockProps, StatAccent, StatSize };
