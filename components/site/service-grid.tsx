import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Service } from "@prisma/client";

type ServiceWithRelations = Service & {
  prices: { id: string; title: string; amount: number }[];
  category: { name: string; slug: string };
};

interface ServiceGridProps {
  services: ServiceWithRelations[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <section className="container py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Услуги</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Актуальные направления</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Техники для тех, кто ценит натуральность. От консультации до финального штриха — всё под контролем мастера.
          </p>
        </div>
        <Button variant="outline" asChild className="w-full rounded-xl md:w-auto">
          <Link href="/services">Все услуги</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="flex h-full flex-col rounded-3xl border border-border/60 bg-white/90 p-8 shadow-soft backdrop-blur"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{service.category.name}</div>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{service.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.excerpt}</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-foreground/70">
                от{" "}
                {service.prices.length > 0
                  ? formatCurrency(service.prices[0].amount, "RUB")
                  : formatCurrency(0, "RUB")}
              </div>
              <Button variant="ghost" asChild>
                <Link href={`/services/${service.slug}`}>Подробнее</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
