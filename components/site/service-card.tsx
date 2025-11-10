import Link from "next/link";
import type { Service, Price, ServiceCategory } from "@prisma/client";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type ServiceWithRelations = Service & {
  prices: Price[];
  category: ServiceCategory;
};

type ServiceCardProps = {
  service: ServiceWithRelations;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const basePrice = service.prices.at(0)?.amount;

  return (
    <Card className="h-full border-border/60 bg-card/70">
      <CardHeader>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{service.category.name}</p>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {service.duration ? (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {service.duration}
            </span>
          ) : null}
          {typeof basePrice === "number" ? (
            <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-ink">
              от {formatCurrency(basePrice)}
            </span>
          ) : null}
        </div>
        <Button asChild className="mt-auto" variant="secondary">
          <Link href={`/services/${service.slug}`}>
            Подробнее
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
