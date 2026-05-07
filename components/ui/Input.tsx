"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

type InputVariant = "text" | "email" | "search";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const defaultTypeMap: Record<InputVariant, string> = {
  text: "text",
  email: "email",
  search: "text",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "text",
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      loading = false,
      id: externalId,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const helperId = `${id}-helper`;

    const isError = Boolean(errorMessage);
    const showLeftIcon = leftIcon !== undefined || variant === "search";
    const showRightSlot = loading || rightIcon !== undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey-1 font-medium"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "relative flex items-center rounded-[3px] border transition-colors",
            isError
              ? "border-[#9F2F2D] focus-within:border-[#9F2F2D] focus-within:ring-2 focus-within:ring-[#9F2F2D]/15"
              : disabled
              ? "border-[rgba(10,10,10,0.18)] bg-paper-2 opacity-50 cursor-not-allowed"
              : [
                  "border-[rgba(10,10,10,0.18)]",
                  "hover:border-ink",
                  "focus-within:border-violet focus-within:ring-2 focus-within:ring-violet/15",
                ]
          )}
          style={{
            transitionDuration: "var(--dur-fast)",
            transitionTimingFunction: "var(--ease-out)",
          }}
        >
          {showLeftIcon && (
            <span
              aria-hidden
              className="absolute left-3.5 flex items-center justify-center text-grey-2 pointer-events-none shrink-0"
            >
              {leftIcon ?? <SearchIcon />}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={defaultTypeMap[variant]}
            inputMode={variant === "email" ? "email" : undefined}
            autoComplete={variant === "email" ? "email" : variant === "search" ? "off" : undefined}
            disabled={disabled}
            aria-invalid={isError || undefined}
            aria-describedby={isError || helperText ? helperId : undefined}
            className={cn(
              "w-full bg-transparent font-body text-[15px] text-ink placeholder:text-grey-2 placeholder:tracking-[0.01em]",
              "py-3 outline-none appearance-none",
              "disabled:cursor-not-allowed",
              showLeftIcon ? "pl-10" : "pl-4",
              showRightSlot ? "pr-10" : "pr-4",
              className
            )}
            {...props}
          />

          {showRightSlot && (
            <span
              aria-hidden={!loading}
              className="absolute right-3.5 flex items-center justify-center text-grey-2 pointer-events-none shrink-0"
            >
              {loading ? <InputSpinner /> : rightIcon}
            </span>
          )}
        </div>

        {(errorMessage || helperText) && (
          <p
            id={helperId}
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.12em]",
              isError ? "text-[#9F2F2D]" : "text-grey-2"
            )}
            role={isError ? "alert" : undefined}
          >
            {errorMessage ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m10.5 10.5 2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InputSpinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-label="Cargando"
      className="animate-spin"
    >
      <circle
        cx="7"
        cy="7"
        r="5"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        strokeOpacity="0.2"
      />
      <path
        d="M12 7a5 5 0 0 1-5 5"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Input };
export type { InputProps, InputVariant };
