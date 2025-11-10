import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const [services, posts, portfolio] = await Promise.all([
    prisma.service.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" }
    }),
    prisma.post.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" }
    }),
    prisma.portfolioItem.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" }
    })
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/portfolio",
    "/reviews",
    "/promos",
    "/blog",
    "/about",
    "/contacts",
    "/faq",
    "/policy",
    "/offer"
  ].map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: new Date()
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: new URL(`/services/${service.slug}`, baseUrl).toString(),
    lastModified: service.updatedAt
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, baseUrl).toString(),
    lastModified: post.updatedAt
  }));

  const portfolioRoutes: MetadataRoute.Sitemap =
    portfolio.length > 0
      ? [
          {
            url: new URL(`/portfolio`, baseUrl).toString(),
            lastModified: portfolio[0].updatedAt
          }
        ]
      : [];

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...portfolioRoutes];
}
