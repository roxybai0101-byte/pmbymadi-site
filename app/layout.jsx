import "./globals.css";
import seo from "../data/seo.json";

export const metadata = {
  metadataBase: new URL(seo.canonical),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: seo.siteName,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: "PM BY MADI" }],
    locale: seo.locale,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-ivory text-ink">{children}</body>
    </html>
  );
}
