import * as React from "react";
import { cn } from "../lib/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "default" | "wide" | "narrow";
}

const widths: Record<Required<ContainerProps>["width"], string> = {
  default: "max-w-5xl",
  wide: "max-w-6xl",
  narrow: "max-w-3xl"
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, width = "wide", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        widths[width],
        className
      )}
      {...props}
    />
  )
);
Container.displayName = "Container";
