import { prisma } from "./prisma";
import type { AppLocale } from "./i18n";
import { localize } from "./localize";
import { formatCurrency } from "./utils";

export async function getMarketingContent(locale: AppLocale) {
  const [services, portfolio, reviews, faq, settings] = await Promise.all([
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" }
    }),
    prisma.portfolioItem.findMany({
      where: { published: true },
      orderBy: { order: "asc" }
    }),
    prisma.review.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.faqItem.findMany({
      where: { published: true },
      orderBy: { order: "asc" }
    }),
    prisma.settings.findUnique({ where: { id: 1 } })
  ]);

  return {
    services: services.map((service) => ({
      ...service,
      title: localize(service.title as Record<string, string>, locale),
      description: localize(service.description as Record<string, string>, locale),
      seoTitle: localize(service.seoTitle as Record<string, string>, locale),
      seoDescription: localize(service.seoDescription as Record<string, string>, locale),
      priceFormatted: formatCurrency(service.price, locale === "ru" ? "ru-RU" : "en-US", "EUR")
    })),
    portfolio: portfolio.map((item) => ({
      ...item,
      alt: localize(item.alt as Record<string, string>, locale),
      title: localize(item.title as Record<string, string>, locale)
    })),
    reviews: reviews.map((review) => ({
      ...review,
      name: localize(review.name as Record<string, string>, locale),
      text: localize(review.text as Record<string, string>, locale)
    })),
    faq: faq.map((item) => ({
      ...item,
      question: localize(item.question as Record<string, string>, locale),
      answer: localize(item.answer as Record<string, string>, locale)
    })),
    settings
  };
}
