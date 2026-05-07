import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  inverted?: boolean;
  className?: string;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: "text-base",
  md: "text-[1.25rem]",
  lg: "text-[2rem]",
};

// "Games" color: violet on light bg, violet-soft on dark bg (maintains brand
// identity while meeting WCAG contrast: violet-soft on ink = 17.3:1)
export function Logo({ size = "md", inverted = false, className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-display font-bold tracking-tight leading-none select-none",
        sizeClasses[size],
        inverted ? "text-paper" : "text-ink",
        className
      )}
    >
      Spot{" "}
      <span
        style={{
          fontFamily: "Times New Roman, Times, serif",
          fontStyle: "italic",
          fontWeight: 400,
          color: inverted ? "var(--violet-soft)" : "var(--violet)",
        }}
      >
        Games
      </span>
    </span>
  );
}
