import type { ComponentType } from "react";
import { LucideShieldCheck, LucideDroplets, LucidePenTool, LucideFeather, LucideHeartHandshake } from "lucide-react";
import { Card, CardContent, CardTitle, SectionHeading, SectionDescription } from "@pmby/ui";

interface AdvantageItem {
  key: string;
  title: string;
  description: string;
}

interface AdvantagesSectionProps {
  title: string;
  items: AdvantageItem[];
}

const icons: Record<string, ComponentType<{ className?: string }>> = {
  sterility: LucideShieldCheck,
  pigments: LucideDroplets,
  customShape: LucidePenTool,
  softTechniques: LucideFeather,
  healingSupport: LucideHeartHandshake
};

export function AdvantagesSection({ title, items }: AdvantagesSectionProps) {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <SectionHeading accent="Care">{title}</SectionHeading>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = icons[item.key] ?? LucideShieldCheck;
            return (
              <Card key={item.key} className="bg-white/85">
                <CardContent className="space-y-4 px-8 py-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-powder">
                    <Icon className="h-6 w-6 text-brand-cocoa" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <SectionDescription>{item.description}</SectionDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
