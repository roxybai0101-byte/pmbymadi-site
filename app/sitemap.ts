import type { MetadataRoute } from "next";
import { getServiceCategories, getBlogPosts, getPages } from "@/lib/data";
import { getSeoDefaults } from "@/lib/settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeoDefaults();
  const baseUrl = seo.siteUrl ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const [categories, posts, pages] = await Promise.all([getServiceCategories(), getBlogPosts(), getPages()]);

  const staticRoutes = ["", "/services", "/portfolio", "/reviews", "/promos", "/blog", "/contacts", "/faq", "/policy", "/oferta", "/master"];

  const serviceRoutes = categories
    .flatMap((category) => category.services.map((service) => `${baseUrl}/services/${service.slug}`));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.createdAt
  }));

  const pageRoutes = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt
  }));

  const staticEntries = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));

  const serviceEntries = serviceRoutes.map((url) => ({
    url,
    lastModified: new Date()
  }));

  return [...staticEntries, ...serviceEntries, ...postRoutes, ...pageRoutes];
}
