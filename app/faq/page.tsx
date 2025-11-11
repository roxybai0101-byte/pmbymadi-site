import type { Metadata } from "next";

import { PageHero } from "@/components/marketing/page-hero";
import { FAQSection } from "@/components/marketing/faq";
import { BookingSection } from "@/components/marketing/booking-section";
import { getFaqs, getServices, getSiteSettings } from "@/lib/queries/site";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQ — PM BY MADI",
    description:
      "Ответы на вопросы о подготовке, болевых ощущениях, стойкости, уходе и коррекции после перманентного макияжа.",
    alternates: {
      canonical: `${siteUrl}/faq`
    }
  };
}

export default async function FAQPage() {
  const [settings, faqs, services] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
    getServices()
  ]);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Подготовка, уход и все нюансы перманента"
        description="Собрала самые частые вопросы. Если не нашли ответ — напишите, расскажу подробнее и подскажу по индивидуальной ситуации."
      />
      <FAQSection faqs={faqs} />
      <BookingSection services={services} settings={settings} />
    </>
  );
}
