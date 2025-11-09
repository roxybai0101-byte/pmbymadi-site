import { forwardRef } from "react";
import { cn } from "../lib/utils";

const variantClasses = {
  primary:
    "bg-ink text-ivory hover:bg-ink/90 shadow-glow hover:shadow-soft hover:-translate-y-0.5",
  secondary:
    "bg-sand-200 text-ink hover:bg-sand-100 border border-sand-300/70 shadow-soft",
  outline:
    "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5 backdrop-blur",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 border border-transparent hover:border-ink/10",
  subtle:
    "bg-white/60 text-ink hover:bg-white/80 border border-white/70 shadow-soft"
};

const sizeClasses = {
  sm: "px-4 py-2 text-xs uppercase tracking-[0.2em]",
  md: "px-6 py-3 text-xs md:text-sm uppercase tracking-[0.28em]",
  lg: "px-8 py-4 text-sm md:text-base uppercase tracking-[0.32em]"
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
      "inline-flex items-center justify-center gap-2 rounded-full transition-transform duration-300 ease-out",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/40",
      "disabled:opacity-60 disabled:cursor-not-allowed",
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
