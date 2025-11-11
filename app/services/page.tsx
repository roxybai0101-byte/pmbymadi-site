import type { Metadata } from "next";

import { PageHero } from "@/components/marketing/page-hero";
import { ServicesSection } from "@/components/marketing/services";
import { BookingSection } from "@/components/marketing/booking-section";
import { getServices, getSiteSettings } from "@/lib/queries/site";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Услуги — PM BY MADI",
    description:
      "Пудровые брови, перманент губ, межресничная стрелка, коррекция и удаление старого ПМ. Мягкие техники и индивидуальный подход.",
    alternates: {
      canonical: `${siteUrl}/services`
    }
  };
}

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Персональные решения для вашей естественной красоты"
        description="Мягкие техники, стерильность и продуманная архитектура — для тех, кто ценит природный результат без перегрузки."
      />
      <ServicesSection services={services} whatsappLink={settings.whatsappLink} showHeading={false} />
      <BookingSection services={services} settings={settings} />
    </>
  );
}
