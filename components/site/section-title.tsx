import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function SectionTitle({ eyebrow, title, description, actions, className }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-4">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h2 className="max-w-xl font-serif text-3xl leading-tight text-foreground md:text-4xl">{title}</h2>
        {description ? <p className="max-w-2xl text-base text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex-shrink-0">{actions}</div> : null}
    </div>
  );
}
