import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-grape text-white border border-grape hover:bg-grape-d hover:border-grape-d neon-border",
  secondary:
    "bg-transparent text-ctrl border border-ctrl hover:bg-ctrl/10 ctrl-border",
  ghost:
    "bg-transparent text-white border border-border hover:border-grape hover:text-grape",
};

export default function NeonButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: NeonButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-semibold text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer rounded-none";

  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
