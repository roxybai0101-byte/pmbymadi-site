import type { Metadata } from "next";

import { PageHero } from "@/components/marketing/page-hero";
import { ContactsSection } from "@/components/marketing/contacts";
import { BookingSection } from "@/components/marketing/booking-section";
import { getServices, getSiteSettings } from "@/lib/queries/site";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Контакты — PM BY MADI",
    description:
      "Записаться на перманентный макияж в Алматы: WhatsApp, Telegram, Instagram и адрес студии PM BY MADI.",
    alternates: {
      canonical: `${siteUrl}/contacts`
    }
  };
}

export default async function ContactsPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Напишите, чтобы подобрать идеальный перманент"
        description="Отвечу в WhatsApp или Telegram, расскажу про подготовку, проверю свободные даты и помогу выбрать услугу."
      />
      <ContactsSection settings={settings} />
      <BookingSection services={services} settings={settings} />
    </>
  );
}
