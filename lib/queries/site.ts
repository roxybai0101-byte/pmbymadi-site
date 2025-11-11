import { cache } from "react";

import { prisma } from "@/lib/prisma";

export const getSiteSettings = cache(async () => {
  const settings = await prisma.siteSetting.findFirst({
    where: { slug: "primary" }
  });

  if (!settings) {
    throw new Error("Site settings not found. Please run the seed script.");
  }

  return settings;
});

export const getServices = cache(async () => {
  return prisma.service.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" }
  });
});

export const getAdvantages = cache(async () => {
  return prisma.advantage.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" }
  });
});

export const getPortfolioItems = cache(async () => {
  return prisma.portfolioItem.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" }
  });
});

export const getReviews = cache(async () => {
  return prisma.review.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" }
  });
});

export const getFaqs = cache(async () => {
  return prisma.faq.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" }
  });
});
