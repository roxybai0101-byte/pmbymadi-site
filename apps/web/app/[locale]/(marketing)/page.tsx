import { getTranslations } from "next-intl/server";

import { assertLocale } from "../../../lib/i18n";
import { getMarketingContent } from "../../../lib/marketing";
import {
  AboutSection,
  AdvantagesSection,
  ContactSection,
  HeroSection,
  PortfolioSection,
  ReviewsSection,
  ServicesSection,
  FaqSection
} from "../../../components/marketing";

interface MarketingPageProps {
  params: { locale: string };
}

export default async function MarketingPage({ params }: MarketingPageProps) {
  const locale = assertLocale(params.locale);

  const tHero = await getTranslations({ locale, namespace: "hero" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tAdvantages = await getTranslations({ locale, namespace: "advantages" });
  const tPortfolio = await getTranslations({ locale, namespace: "portfolio" });
  const tReviews = await getTranslations({ locale, namespace: "reviews" });
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tContacts = await getTranslations({ locale, namespace: "contacts" });

  const { services, portfolio, reviews, faq, settings } = await getMarketingContent(locale);

  const advantagesItems = Object.entries(
    tAdvantages.raw("items") as Record<string, { title: string; description: string }>
  ).map(([key, value]) => ({
    key,
    title: value.title,
    description: value.description
  }));

  return (
    <>
      <HeroSection
        locale={locale}
        whatsappPhone={settings?.whatsappPhone}
        translations={{
          headline: tHero("headline"),
          subheadline: tHero("subheadline"),
          ctaPrimary: tHero("ctaPrimary"),
          ctaSecondary: tHero("ctaSecondary"),
          bullets:
            locale === "ru"
              ? ["Мягкие техники", "Сертифицированные пигменты", "Сопровождение 24/7"]
              : ["Gentle techniques", "Certified pigments", "Support 24/7"],
          note:
            locale === "ru"
              ? "Персональная консультация перед каждой процедурой"
              : "Personal consultation before every appointment"
        }}
      />

      <AboutSection title={tAbout("title")} description={tAbout("description")} />

      <ServicesSection
        title={tServices("title")}
        subtitle={tServices("subtitle")}
        labels={{
          duration: tServices("duration"),
          price: tServices("price"),
          book: tServices("book")
        }}
        services={services.map((service) => ({
          id: service.id,
          slug: service.slug,
          title: service.title,
          description: service.description,
          duration: service.duration,
          priceFormatted: service.priceFormatted
        }))}
        locale={locale}
      />

      <AdvantagesSection title={tAdvantages("title")} items={advantagesItems} />

      <PortfolioSection
        title={tPortfolio("title")}
        filterAll={tPortfolio("filterAll")}
        filters={tPortfolio.raw("filter") as Record<string, string>}
        cta={tPortfolio("cta")}
        items={portfolio.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          alt: item.alt,
          tag: item.tag,
          title: item.title
        }))}
        instagramUrl={settings?.instagramUrl}
      />

      <ReviewsSection
        title={tReviews("title")}
        subtitle={tReviews("subtitle")}
        ratingLabel={tReviews("rating")}
        reviews={reviews.map((review) => ({
          id: review.id,
          name: review.name,
          rating: review.rating,
          text: review.text
        }))}
      />

      <FaqSection
        title={tFaq("title")}
        subtitle={tFaq("subtitle")}
        items={faq.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer
        }))}
      />

      <ContactSection
        locale={locale}
        title={tContacts("title")}
        subtitle={tContacts("subtitle")}
        labels={{
          name: tContacts("form.name"),
          phone: tContacts("form.phone"),
          service: tContacts("form.service"),
          comment: tContacts("form.comment"),
          submit: tContacts("form.submit"),
          success: tContacts("success"),
          error: tContacts("error")
        }}
        services={services.map((service) => ({
          id: service.id,
          title: service.title
        }))}
        whatsappPhone={settings?.whatsappPhone}
        telegramUrl={settings?.telegramUrl}
        instagramUrl={settings?.instagramUrl}
        address={settings?.address}
        mapUrl={settings?.mapUrl ?? undefined}
        workingHours={
          (settings?.brandStatement as Record<string, string> | null | undefined)?.[locale] ?? undefined
        }
      />
    </>
  );
}
