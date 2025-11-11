import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const sans = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-sans"
});

const serif = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-serif"
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PM BY MADI — Премиальный перманентный макияж",
    template: "%s — PM BY MADI"
  },
  description:
    "Пудровые брови, перманент губ и межресничка с индивидуальным подбором формы и стерильным протоколом. Мягкие техники, деликатный уход и стойкий результат.",
  keywords: [
    "перманентный макияж Алматы",
    "пудровые брови",
    "перманент губ",
    "межресничная стрелка",
    "PM BY MADI",
    "мастер перманентного макияжа"
  ],
  authors: [{ name: "PM BY MADI" }],
  creator: "PM BY MADI",
  openGraph: {
    title: "PM BY MADI — Премиальный перманентный макияж",
    description:
      "Гиперточная эстетика, стерильность и стойкий результат. Пудровые брови, перманент губ, межресничная стрелка и коррекции.",
    url: siteUrl,
    siteName: "PM BY MADI",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "PM BY MADI — премиальный перманентный макияж"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@pm_by_madi",
    creator: "@pm_by_madi",
    title: "PM BY MADI — перманентный макияж",
    description:
      "Премиальные техники перманентного макияжа. Пудровые брови, губы, межресничка и коррекция.",
    images: [`${siteUrl}/og-default.png`]
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/favicon-192.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/pm-by-madi-logo.svg"
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#F3E9E4"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-brand-powder text-brand-chocolate antialiased",
          sans.variable,
          serif.variable,
          "font-sans"
        )}
      >
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
          <Toaster richColors />
        </AppProviders>
      </body>
    </html>
  );
}
