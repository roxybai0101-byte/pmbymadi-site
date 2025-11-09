import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "PM BY MADI — Современный перманентный макияж",
  description:
    "Пудровые брови, губы и межресничка в натуральной эстетике. Запись в Telegram.",
  openGraph: {
    title: "PM BY MADI — Современный перманентный макияж",
    description:
      "Пудровые брови, губы и межресничка: естественный и аккуратный результат.",
    url: "https://pmby-madi-site-wq38.vercel.app/",
    siteName: "PM BY MADI",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "PM BY MADI",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM BY MADI — Современный перманентный макияж",
    description: "Пудровые брови, губы, межресничка — натуральный результат.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        {/* Канонический URL */}
        <link
          rel="canonical"
          href="https://pmby-madi-site-wq38.vercel.app/"
        />

        {/* JSON-LD Schema.org */}
        <Script
          id="ldjson"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: "PM BY MADI",
              url: "https://pmby-madi-site-wq38.vercel.app/",
              image: "https://pmby-madi-site-wq38.vercel.app/og-image.svg",
              description:
                "Современный перманентный макияж: пудровые брови, губы и межресничная линия.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Москва",
                addressCountry: "RU",
              },
              sameAs: ["https://t.me/pm_by_madi"],
            }),
          }}
        />
      </head>

      <body className="bg-ivory text-ink">{children}</body>
    </html>
  );
}
