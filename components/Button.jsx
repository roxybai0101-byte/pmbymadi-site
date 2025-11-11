import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  primary:
    "bg-sand-600 text-ivory shadow-glow hover:bg-sand-500 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sand-400",
  secondary:
    "bg-white text-ink border border-sand-200/80 shadow-soft hover:bg-sand-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sand-200",
  ghost:
    "bg-transparent text-ink/80 hover:text-ink focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/30",
  outline:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/20"
};

const sizeClasses = {
  sm: "px-4 py-2 text-xs uppercase tracking-[0.28em]",
  md: "px-6 py-3 text-xs md:text-sm uppercase tracking-[0.32em]",
  lg: "px-7 py-[14px] text-sm md:text-base uppercase tracking-[0.36em]"
};

const Button = forwardRef(function Button(
  { variant = "primary", size = "md", href, className, children, ...props },
  ref
) {
  const Component = href ? "a" : "button";
  const isExternal =
    typeof href === "string" && (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"));

  const componentProps = {
    ref,
    className: cn(
      "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 ease-out",
      "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60",
      variantClasses[variant] ?? variantClasses.primary,
      sizeClasses[size] ?? sizeClasses.md,
      className
    ),
    ...props
  };

  if (href) {
    componentProps.href = href;
    if (isExternal) {
      componentProps.rel = props.rel ?? "noopener noreferrer";
      componentProps.target = props.target ?? "_blank";
    }
  }

  return <Component {...componentProps}>{children}</Component>;
});

export default Button;
