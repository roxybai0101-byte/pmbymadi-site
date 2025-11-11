import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
};

export function PageHero({ title, description, eyebrow, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-powder via-brand-white to-brand-warm/30" />
      <div className="relative mx-auto w-full max-w-4xl space-y-6 px-6 py-16 text-center">
        {eyebrow ? (
          <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="font-serif text-4xl text-brand-chocolate md:text-5xl">{title}</h1>
        {description ? (
          <p className="text-base leading-relaxed text-brand-cocoa/80">{description}</p>
        ) : null}
        {actions ? <div className="flex justify-center">{actions}</div> : null}
      </div>
    </section>
  );
}
