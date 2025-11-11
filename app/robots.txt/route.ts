import type { MetadataRoute } from "next";
import { getSeoDefaults } from "@/lib/settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeoDefaults();
  const baseUrl = seo.siteUrl ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      }
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
