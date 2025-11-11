import "./globals.css";
import { Manrope, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import site from "@/data/site.json";
import seo from "@/data/seo.json";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap"
});

const siteUrl = seo.siteUrl ?? "https://pm-by-madi.ru";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s — ${site.brand}`
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: "PM BY MADI" }],
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: siteUrl,
    siteName: site.brand,
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: seo.ogImage,
        alt: "PM BY MADI — перманентный макияж"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage]
  },
  alternates: {
    canonical: siteUrl
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport = {
  themeColor: "#fdf9f3"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans bg-ivory text-ink">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
