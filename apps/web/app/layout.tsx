import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { CookieConsent } from "../components/cookie-consent";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "PM BY MADI — Premium Permanent Makeup",
    template: "%s | PM BY MADI"
  },
  description:
    "Premium permanent makeup studio by Madi. Brows, lips, eyeliner with certified pigments and gentle techniques.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/favicon-192.png" }]
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-brand-powder text-brand-chocolate">
        {children}
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
