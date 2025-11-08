import "./globals.css";

import { Manrope, Playfair_Display } from "next/font/google";

import Header from "../components/Header";

const serif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata = {
  metadataBase: new URL("https://pm-by-madi.vercel.app"),
  title: "PM BY MADI — Современный перманентный макияж",
  description:
    "Premium студия перманентного макияжа PM BY MADI. Натуральная эстетика, авторские техники и безупречный сервис в бровях, губах и межресничном пространстве.",
  keywords: [
    "перманентный макияж",
    "пудровые брови",
    "перманент губ",
    "перманент межресничка",
    "PM BY MADI",
    "Минск перманент",
    "современный перманентный макияж"
  ],
  openGraph: {
    title: "PM BY MADI — Premium Permanent Makeup",
    description:
      "Натуральная эстетика. Пудровые брови, губы, межресничка — деликатные техники перманента от MADI.",
    url: "https://pm-by-madi.vercel.app",
    siteName: "PM BY MADI",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "PM BY MADI — Современный перманентный макияж"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PM BY MADI — Современный перманентный макияж",
    description:
      "Premium студия перманентного макияжа. Натуральная эстетика и деликатные техники для бровей, губ и глаз.",
    creator: "@pm_by_madi",
    images: ["/og-image.svg"]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-ivory text-ink">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-20 top-[-12rem] h-[380px] w-[380px] rounded-full bg-sand-100 blur-[120px] md:-left-10 md:top-[-14rem]" />
            <div className="absolute right-[-10rem] top-[420px] h-[420px] w-[420px] rounded-full bg-sand-200/70 blur-[140px] md:right-[-6rem]" />
            <div className="absolute bottom-[-12rem] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-white/60 blur-[160px]" />
          </div>
          <Header />
          <main className="flex min-h-screen flex-col pt-28 md:pt-32">{children}</main>
        </div>
      </body>
    </html>
  );
}
