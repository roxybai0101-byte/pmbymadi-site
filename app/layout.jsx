
import "@/globals.css";
import Script from "next/script";
import seo from "@/data/seo.json";
import site from "@/data/site.json";

export const metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: site.brand
      }
    ],
    locale: "ru_RU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="canonical" href={seo.url} />

        {/* JSON-LD */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: site.brand,
              url: seo.url,
              image: seo.ogImage,
              description: seo.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: seo.city,
                addressCountry: seo.country
              },
              sameAs: [site.telegram]
            })
          }}
        />
      </head>
      <body className="bg-ivory text-ink">{children}</body>
    </html>
  );
}
