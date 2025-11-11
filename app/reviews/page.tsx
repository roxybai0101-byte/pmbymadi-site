import type { Metadata } from "next";

import { PageHero } from "@/components/marketing/page-hero";
import { ReviewCarousel } from "@/components/marketing/review-carousel";
import { BookingSection } from "@/components/marketing/booking-section";
import { getReviews, getServices, getSiteSettings } from "@/lib/queries/site";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Отзывы — PM BY MADI",
    description:
      "Отзывы клиенток о пудровых бровях, перманенте губ, межресничке и удалении старого перманента. Натуральный результат и комфорт.",
    alternates: {
      canonical: `${siteUrl}/reviews`
    }
  };
}

export default async function ReviewsPage() {
  const [settings, reviews, services] = await Promise.all([
    getSiteSettings(),
    getReviews(),
    getServices()
  ]);

  return (
    <>
      <PageHero
        eyebrow="Отзывы"
        title="Когда натуральность говорят за себя"
        description="Пудровые брови, губы и межресничка — без перебора и с заботой о каждой детали. Спасибо, что делитесь впечатлениями."
      />
      <ReviewCarousel reviews={reviews} />
      <BookingSection services={services} settings={settings} />
    </>
  );
}
