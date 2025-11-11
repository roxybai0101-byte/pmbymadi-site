import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-brand-gold/40 bg-brand-white/80 text-brand-cocoa",
        muted: "border-transparent bg-brand-powder text-brand-cocoa/70",
        gold: "border-brand-gold/30 bg-brand-gold/20 text-brand-chocolate"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
