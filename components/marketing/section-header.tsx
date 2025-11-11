import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left"
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto text-center",
        align === "center" && description && "max-w-3xl"
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cocoa/60">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-serif text-3xl text-brand-chocolate md:text-4xl lg:text-[44px] lg:leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-brand-cocoa/80">{description}</p>
      ) : null}
      {actions ? <div className="pt-2">{actions}</div> : null}
    </div>
  );
}
