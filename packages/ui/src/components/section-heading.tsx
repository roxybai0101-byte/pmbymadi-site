import * as React from "react";
import { cn } from "../lib/cn";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  accent?: string;
}

export const SectionHeading = React.forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ className, accent, children, ...props }, ref) => (
    <div className="flex flex-col gap-3">
      {accent ? (
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-gold">
          {accent}
        </span>
      ) : null}
      <h2
        ref={ref}
        className={cn("text-3xl font-serif text-brand-chocolate sm:text-4xl", className)}
        {...props}
      >
        {children}
      </h2>
    </div>
  )
);
SectionHeading.displayName = "SectionHeading";

export interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const SectionDescription = React.forwardRef<HTMLParagraphElement, SectionDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-base text-brand-cocoa/90 md:text-lg", className)}
      {...props}
    />
  )
);
SectionDescription.displayName = "SectionDescription";
