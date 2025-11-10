import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getSiteSettings = cache(async () => {
  const entries = await prisma.setting.findMany({
    where: {
      key: {
        in: ["site", "contacts"]
      }
    }
  });

  const map = Object.fromEntries(entries.map((entry) => [entry.key, entry.value]));
  return {
    site: map.site ?? {},
    contacts: map.contacts ?? {}
  };
});

export const getServiceCatalog = cache(async () => {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        orderBy: { order: "asc" },
        include: {
          prices: {
            orderBy: { order: "asc" }
          }
        }
      }
    }
  });

  return categories;
});

export const getServiceBySlug = cache(async (slug: string) => {
  return prisma.service.findUnique({
    where: { slug },
    include: {
      prices: {
        orderBy: { order: "asc" }
      },
      category: {
        include: {
          services: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              slug: true,
              excerpt: true
            }
          }
        }
      }
    }
  });
});

export const getFeaturedPortfolio = cache(async () => {
  return prisma.portfolioItem.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      coverImage: true,
      service: true
    },
    take: 9
  });
});

export const getPortfolio = cache(async () => {
  return prisma.portfolioItem.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      coverImage: true,
      service: true
    }
  });
});

export const getReviews = cache(async () => {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      service: true,
      avatar: true
    }
  });
});

export const getActivePromos = cache(async () => {
  const now = new Date();

  return prisma.promo.findMany({
    where: {
      isActive: true,
      OR: [
        {
          startsAt: null
        },
        {
          startsAt: { lte: now }
        }
      ],
      AND: [
        {
          OR: [
            { endsAt: null },
            {
              endsAt: { gte: now }
            }
          ]
        }
      ]
    },
    orderBy: { createdAt: "desc" }
  });
});

export const getPromos = cache(async () => {
  return prisma.promo.findMany({
    orderBy: { createdAt: "desc" }
  });
});

export const getPublishedPosts = cache(async () => {
  return prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: {
      coverImage: true
    }
  });
});

export const getPostBySlug = cache(async (slug: string) => {
  return prisma.post.findFirst({
    where: { slug, isPublished: true },
    include: {
      coverImage: true
    }
  });
});

export const getPageBySlug = cache(async (slug: string) => {
  return prisma.page.findUnique({
    where: { slug }
  });
});
