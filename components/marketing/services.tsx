import Link from "next/link";

import type { Service } from "@prisma/client";

import { SectionHeader } from "@/components/marketing/section-header";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

type ServicesSectionProps = {
  services: Service[];
  whatsappLink: string;
  showHeading?: boolean;
};

export function ServicesSection({
  services,
  whatsappLink,
  showHeading = true
}: ServicesSectionProps) {
  return (
    <section className="section-padding">
      <div className="mx-auto w-full max-w-6xl space-y-12">
        {showHeading ? (
          <SectionHeader
            eyebrow="Услуги"
            title="Подчёркиваю природную эстетику мягкими техниками"
            description="Каждый этап — от эскиза до ухода — выстроен вокруг безопасности, натурального результата и вашего комфорта."
          />
        ) : null}
          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => {
              const bookingLink = buildWhatsAppUrl(
                whatsappLink,
                `Здравствуйте! Хочу записаться на услугу "${service.title}".`
              );

              return (
                <article
                  key={service.id}
                  className="flex h-full flex-col justify-between rounded-[34px] border border-brand-warm/40 bg-white/90 p-8 shadow-soft transition hover:-translate-y-1"
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl text-brand-chocolate">{service.title}</h3>
                      <p className="text-sm uppercase tracking-[0.3em] text-brand-cocoa/50">
                        {service.duration}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-brand-cocoa/80">
                      {service.shortDescription}
                    </p>
                    <p className="text-sm leading-relaxed text-brand-cocoa/70">
                      {service.longDescription}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">
                        Стоимость
                      </p>
                      <p className="font-serif text-xl text-brand-chocolate">
                        {service.price ?? "По запросу"}
                      </p>
                    </div>
                    <Button asChild variant="secondary">
                      <Link href={bookingLink} target="_blank" rel="noopener noreferrer">
                        Записаться
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
      </div>
    </section>
  );
}
