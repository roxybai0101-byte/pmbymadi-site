import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, SectionDescription, SectionHeading, Button } from "@pmby/ui";

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  labels: {
    duration: string;
    price: string;
    book: string;
  };
  services: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
    duration: string | null;
    priceFormatted: string;
  }>;
  locale: string;
}

export function ServicesSection({ title, subtitle, labels, services, locale }: ServicesSectionProps) {
  return (
    <section id="services" className="pb-20 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 space-y-6 text-center">
          <SectionHeading accent="Services">{title}</SectionHeading>
          <SectionDescription className="mx-auto max-w-2xl">{subtitle}</SectionDescription>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id} className="h-full">
              <CardHeader className="space-y-4">
                <CardTitle>{service.title}</CardTitle>
                <SectionDescription>{service.description}</SectionDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap items-center gap-6 text-sm text-brand-chocolate/70">
                  {service.duration ? (
                    <span className="rounded-full bg-brand-powder px-4 py-2">
                      {labels.duration}: {service.duration}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-brand-gold/20 px-4 py-2 font-semibold text-brand-chocolate">
                    {labels.price}: {service.priceFormatted}
                  </span>
                </div>
                <Button asChild>
                  <Link href={`/${locale}/services?service=${service.slug}`}>{labels.book}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
