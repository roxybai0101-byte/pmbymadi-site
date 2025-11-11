import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaLink: string;
  secondaryCtaLabel?: string | null;
  secondaryCtaLink?: string | null;
}

const FEATURES = [
  { title: "Эстетика без перегруза", description: "Мягкие градиенты и продуманная архитектура." },
  { title: "Премиальные пигменты", description: "Гипоаллергенные формулы и стойкий цвет." },
  { title: "Индивидуальная колористика", description: "Подбираем оттенок под подтон и образ." },
  { title: "Поддержка после процедуры", description: "Подробный гайд по уходу и связь в мессенджерах." }
];

export function Hero({ headline, subheadline, ctaLabel, ctaLink, secondaryCtaLabel, secondaryCtaLink }: HeroProps) {
  return (
    <section className="container relative overflow-hidden py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-[1fr,420px] md:items-center">
        <div className="space-y-8">
          <Badge variant="muted">PM BY MADI</Badge>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight text-foreground md:text-6xl">{headline}</h1>
          <p className="max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">{subheadline}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild className="rounded-xl px-6 py-3 text-base">
              <Link href={ctaLink}>{ctaLabel}</Link>
            </Button>
            {secondaryCtaLabel && secondaryCtaLink ? (
              <Button variant="outline" asChild className="rounded-xl px-6 py-3 text-base">
                <Link href={secondaryCtaLink}>{secondaryCtaLabel}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-sand-100 via-white to-sand-200 opacity-60" />
          <div className="relative h-[420px] overflow-hidden rounded-[48px] border border-border/40 bg-white shadow-glow" />
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-border/50 bg-white/80 p-6 shadow-soft backdrop-blur">
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
