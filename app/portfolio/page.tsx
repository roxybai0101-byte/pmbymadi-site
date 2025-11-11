import type { Metadata } from "next";

import { PageHero } from "@/components/marketing/page-hero";
import { PortfolioGallery } from "@/components/marketing/portfolio-gallery";
import { BookingSection } from "@/components/marketing/booking-section";
import { getPortfolioItems, getServices, getSiteSettings } from "@/lib/queries/site";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Портфолио — PM BY MADI",
    description:
      "Реальные работы: пудровые брови, перманент губ и межресничка. Натуральный результат и мягкая эстетика.",
    alternates: {
      canonical: `${siteUrl}/portfolio`
    }
  };
}

export default async function PortfolioPage() {
  const [settings, portfolioItems, services] = await Promise.all([
    getSiteSettings(),
    getPortfolioItems(),
    getServices()
  ]);

  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="До / После в мягких техниках"
        description="Собрала работы, которые показывают, как аккуратно и деликатно раскрывается пигмент. Без жёстких границ и сильной травматизации."
      />
      <PortfolioGallery items={portfolioItems} />
      <BookingSection services={services} settings={settings} />
    </>
  );
}
