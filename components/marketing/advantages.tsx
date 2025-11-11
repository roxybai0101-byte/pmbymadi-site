import { ShieldCheck, FlaskConical, Ruler, Feather, HeartHandshake, Sparkles } from "lucide-react";

import type { Advantage } from "@prisma/client";

import { SectionHeader } from "@/components/marketing/section-header";

const iconMap = {
  ShieldCheck,
  FlaskConical,
  Ruler,
  Feather,
  HeartHandshake,
  Sparkles
};

type AdvantagesSectionProps = {
  advantages: Advantage[];
};

export function AdvantagesSection({ advantages }: AdvantagesSectionProps) {
  return (
    <section className="section-padding bg-brand-powder/40">
      <div className="mx-auto w-full max-w-6xl space-y-12">
        <SectionHeader
          eyebrow="Преимущества"
          title="Что делает PM BY MADI особенным"
          description="Каждая процедура выстроена вокруг вашего комфорта, безопасности и долгосрочной эстетики."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {advantages.map((advantage) => {
            const Icon = iconMap[advantage.icon as keyof typeof iconMap] ?? Sparkles;
            return (
              <div
                key={advantage.id}
                className="group relative overflow-hidden rounded-[34px] border border-brand-warm/40 bg-white/80 p-6 shadow-soft backdrop-blur transition hover:-translate-y-1"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-warm/30 blur-3xl transition group-hover:bg-brand-gold/20" />
                <div className="relative flex items-start gap-6">
                  <div className="rounded-2xl border border-brand-gold/30 bg-brand-powder/80 p-4 text-brand-chocolate shadow-subtle">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-brand-chocolate">
                      {advantage.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-cocoa/80">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
