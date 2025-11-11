import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getServiceCategories = cache(async () => {
  return prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        orderBy: { title: "asc" },
        include: {
          prices: {
            orderBy: { amount: "asc" }
          }
        }
      }
    }
  });
});

export const getFeaturedServices = cache(async () => {
  return prisma.service.findMany({
    where: { isFeatured: true },
    orderBy: { title: "asc" },
    include: {
      category: true,
      prices: {
        orderBy: { amount: "asc" }
      }
    },
    take: 4
  });
});

export const getServiceBySlug = cache(async (slug: string) => {
  return prisma.service.findUnique({
    where: { slug },
    include: {
      category: true,
      prices: {
        orderBy: { amount: "asc" }
      },
      portfolioItems: {
        orderBy: { order: "asc" },
        include: {
          image: true
        }
      },
      reviews: {
        orderBy: { createdAt: "desc" }
      }
    }
  });
});

export const getPortfolio = cache(async () => {
  return prisma.portfolioItem.findMany({
    orderBy: { order: "asc" },
    include: {
      image: true,
      service: {
        select: {
          title: true,
          slug: true
        }
      }
    }
  });
});

export const getReviews = cache(async () => {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      service: {
        select: {
          title: true,
          slug: true
        }
      }
    }
  });
});

export const getPromos = cache(async () => {
  return prisma.promo.findMany({
    orderBy: { createdAt: "desc" }
  });
});

export const getBlogPosts = cache(async () => {
  return prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
    include: {
      cover: true
    }
  });
});

export const getPostBySlug = cache(async (slug: string) => {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      cover: true
    }
  });
});

export const getPageBySlug = cache(async (slug: string) => {
  return prisma.page.findUnique({
    where: { slug }
  });
});

export const getPages = cache(async () => {
  return prisma.page.findMany({
    orderBy: { title: "asc" }
  });
});

export const getFaqItems = cache(async () => {
  return prisma.faqItem.findMany({
    orderBy: { order: "asc" }
  });
});

export const getMediaLibrary = cache(async () => {
  return prisma.media.findMany({
    orderBy: { createdAt: "desc" }
  });
});

export const getSubmissions = cache(async () => {
  return prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      service: {
        select: {
          title: true,
          slug: true
        }
      }
    }
  });
});

export async function getDashboardMetrics() {
  const [servicesCount, submissionsCount, portfolioCount, reviewsCount] = await Promise.all([
    prisma.service.count(),
    prisma.submission.count(),
    prisma.portfolioItem.count(),
    prisma.review.count()
  ]);

  return {
    servicesCount,
    submissionsCount,
    portfolioCount,
    reviewsCount
  };
}
