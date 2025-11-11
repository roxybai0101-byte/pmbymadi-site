import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { getSeoDefaults } from "@/lib/settings";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoDefaults();
  return {
    metadataBase: seo.metadataBase,
    title: {
      default: seo.title,
      template: `%s — ${seo.brand}`
    },
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.siteUrl,
      siteName: seo.brand,
      type: "website",
      locale: "ru_RU",
      images: seo.openGraphImages
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.openGraphImages.map((image) => image.url)
    },
    alternates: {
      canonical: seo.siteUrl
    },
    icons: {
      icon: "/favicon.svg"
    }
  };
}

export const viewport = {
  themeColor: "#fdf9f3"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={cn(sans.variable, serif.variable)}>
      <body className="bg-background text-foreground">
        <div className="flex min-h-screen flex-col">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
