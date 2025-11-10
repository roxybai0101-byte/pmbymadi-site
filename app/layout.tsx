import "@total-typescript/ts-reset";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import { getSiteSettings } from "@/lib/queries/public";
import type { SiteSettingValue } from "@/types/content";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-serif",
  display: "swap"
});

const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const site = (settings.site as SiteSettingValue) ?? {};

  const title = site.seo?.title ?? site.name ?? "PM BY MADI — студия перманентного макияжа";
  const description =
    site.seo?.description ??
    site.subheading ??
    "Перманентный макияж с деликатным подходом. Брови, губы, межресничка и стрелки от мастера Мадины.";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: {
      default: title,
      template: "%s — PM BY MADI"
    },
    description,
    icons: {
      icon: "/favicon.ico"
    },
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: site.name ?? "PM BY MADI",
      type: "website"
    }
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6ede4" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1b18" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${serif.variable} ${sans.variable} font-sans bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
