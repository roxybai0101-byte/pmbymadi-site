import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "soft";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-cocoa text-white shadow-soft hover:bg-brand-chocolate transition-colors disabled:bg-brand-cocoa/60",
  secondary:
    "bg-brand-beige text-brand-chocolate hover:bg-brand-beige/80 shadow-soft disabled:bg-brand-beige/60",
  outline:
    "border border-brand-cocoa/30 text-brand-chocolate hover:bg-brand-powder disabled:opacity-60",
  ghost: "text-brand-chocolate hover:bg-brand-powder disabled:opacity-60",
  link: "text-brand-cocoa underline-offset-4 hover:underline disabled:opacity-60",
  soft: "bg-brand-powder text-brand-chocolate hover:bg-brand-powder/80 disabled:opacity-60"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  icon: "h-10 w-10"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant = "primary", size = "md", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-3xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
