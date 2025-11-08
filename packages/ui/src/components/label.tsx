import * as React from "react";
import { cn } from "../lib/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-brand-chocolate/90", className)}
      {...props}
    >
      {children}
    </label>
  )
);
Label.displayName = "Label";
