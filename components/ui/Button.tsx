"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "violet" | "outline" | "ghost";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  arrow?: boolean;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-neon text-ink border-transparent hover:bg-[#00C853] focus-visible:ring-violet",
  violet:
    "bg-violet text-white border-transparent hover:bg-violet-deep focus-visible:ring-violet",
  outline:
    "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper focus-visible:ring-ink",
  ghost:
    "bg-transparent text-ink border-transparent hover:bg-ink/[0.06] focus-visible:ring-ink",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1 },
  tap: { scale: 0.97 },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 3 },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      loading = false,
      arrow = false,
      size = "md",
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        variants={!isDisabled && !reducedMotion ? buttonVariants : undefined}
        initial="rest"
        whileHover={!isDisabled && !reducedMotion ? "hover" : undefined}
        whileTap={!isDisabled && !reducedMotion ? "tap" : undefined}
        disabled={isDisabled}
        className={cn(
          "relative inline-flex items-center justify-center font-display font-medium tracking-tight",
          "border rounded-[4px] transition-colors select-none cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        style={{
          transitionDuration: "var(--dur-fast)",
          transitionTimingFunction: "var(--ease-out)",
        }}
        {...(props as object)}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner variant={variant} />
          </span>
        )}

        <span
          className={cn(
            "inline-flex items-center gap-[inherit] transition-opacity duration-[var(--dur-fast)]",
            loading && "opacity-0"
          )}
        >
          {children}
          {arrow && !loading && (
            <motion.span
              aria-hidden
              className="inline-block leading-none"
              variants={!reducedMotion ? arrowVariants : undefined}
              transition={{ duration: 0.18, ease: EASE_OUT }}
            >
              →
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

function Spinner({ variant }: { variant: ButtonVariant }) {
  const strokeColor =
    variant === "primary" ? "#0A0A0A" : variant === "violet" ? "#ffffff" : "#0A0A0A";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-label="Cargando"
      className="animate-spin"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke={strokeColor}
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M14 8a6 6 0 0 1-6 6"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Button };
export type { ButtonProps, ButtonVariant };
