import * as React from "react";
import { cn } from "../lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "soft";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants: Record<Required<BadgeProps>["variant"], string> = {
      default: "bg-brand-gold/90 text-brand-chocolate",
      outline: "border border-brand-gold/60 text-brand-chocolate",
      soft: "bg-brand-powder text-brand-chocolate/90"
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-4 py-1 text-xs font-medium uppercase tracking-wide",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
