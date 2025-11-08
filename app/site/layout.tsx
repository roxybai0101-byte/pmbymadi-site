
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PM BY MADI — Permanent Makeup Studio",
  description: "Красивая стартовая страница бренда PM BY MADI. Next.js + Vercel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
