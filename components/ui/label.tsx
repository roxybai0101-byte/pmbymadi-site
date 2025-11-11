import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none text-brand-cocoa/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
  {
    variants: {
      tone: {
        default: "",
        subtle: "text-brand-cocoa/70",
        accent: "text-brand-chocolate"
      }
    },
    defaultVariants: {
      tone: "default"
    }
  }
);

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, tone, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ tone }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
