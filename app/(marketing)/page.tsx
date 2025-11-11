import type { Metadata } from "next";

import { AboutSection } from "@/components/marketing/about";
import { AdvantagesSection } from "@/components/marketing/advantages";
import { BookingSection } from "@/components/marketing/booking-section";
import { ContactsSection } from "@/components/marketing/contacts";
import { FAQSection } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PortfolioGallery } from "@/components/marketing/portfolio-gallery";
import { ReviewCarousel } from "@/components/marketing/review-carousel";
import { ServicesSection } from "@/components/marketing/services";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAdvantages,
  getFaqs,
  getPortfolioItems,
  getReviews,
  getServices,
  getSiteSettings
} from "@/lib/queries/site";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings.seoTitle ?? "PM BY MADI — премиальный перманентный макияж",
    description:
      settings.seoDescription ??
      "Перманентный макияж в мягких техниках: пудровые брови, губы, межресничная стрелка и коррекция. Индивидуальный подход и стерильность.",
    openGraph: {
      url: siteUrl,
      title: settings.seoTitle ?? "PM BY MADI — премиальный перманентный макияж",
      description:
        settings.seoDescription ??
        "Перманентный макияж в мягких техниках: пудровые брови, губы, межресничная стрелка и коррекция.",
      images: [
        {
          url: settings.seoImage ?? `${siteUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: "PM BY MADI — премиальный перманентный макияж"
        }
      ]
    }
  };
}

export default async function HomePage() {
  const [settings, services, advantages, portfolioItems, reviews, faqs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getAdvantages(),
    getPortfolioItems(),
    getReviews(),
    getFaqs()
  ]);

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: settings.businessName,
    description: settings.seoDescription,
    url: siteUrl,
    logo: `${siteUrl}/pm-by-madi-logo.svg`,
    image: settings.seoImage ?? `${siteUrl}/og-default.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address
    },
    telephone: settings.whatsapp,
    sameAs: [settings.instagram, settings.telegram].filter(Boolean)
  };

  const servicesLd = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Person",
      name: "PM BY MADI"
    },
    areaServed: "Алматы, Казахстан"
  }));

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <Hero whatsappLink={settings.whatsappLink} />
      <AboutSection />
      <AdvantagesSection advantages={advantages} />
      <ServicesSection services={services} whatsappLink={settings.whatsappLink} />
      <PortfolioGallery items={portfolioItems} />
      <ReviewCarousel reviews={reviews} />
      <FAQSection faqs={faqs} />
      <BookingSection services={services} settings={settings} />
      <ContactsSection settings={settings} />

      <JsonLd data={organizationLd} />
      {servicesLd.map((service) => (
        <JsonLd key={service.name as string} data={service} />
      ))}
      <JsonLd data={faqLd} />
    </>
  );
}
