"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import type { AppLocale } from "../../lib/i18n";
import { buildWhatsappUrl } from "../../lib/utils";

interface MarketingFooterProps {
  locale: AppLocale;
  whatsappPhone?: string | null;
  instagramUrl?: string | null;
  telegramUrl?: string | null;
  address?: string | null;
}

export function MarketingFooter({
  locale,
  whatsappPhone,
  instagramUrl,
  telegramUrl,
  address
}: MarketingFooterProps) {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const year = new Date().getFullYear();
  const whatsappLink =
    buildWhatsappUrl(
      whatsappPhone ?? process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "+48000000000",
      locale === "ru" ? "Здравствуйте! Хочу записаться в PM BY MADI." : "Hello! I'd love to book an appointment at PM BY MADI."
    ) ?? "#";

  return (
    <footer className="relative z-10 mt-16 border-t border-brand-cocoa/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex flex-col gap-10 px-6 py-12 md:flex-row md:justify-between md:px-12">
        <div className="space-y-3 max-w-sm">
          <img src="/pm-by-madi-logo.svg" alt="PM BY MADI" className="h-9 w-auto" />
          <p className="text-sm text-brand-cocoa/70">{address ?? "Warsaw, Poland"}</p>
          <div className="flex gap-4 text-sm text-brand-chocolate/80">
            {instagramUrl ? (
              <Link href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-brand-chocolate">
                Instagram
              </Link>
            ) : null}
            {telegramUrl ? (
              <Link href={telegramUrl} target="_blank" rel="noreferrer" className="hover:text-brand-chocolate">
                Telegram
              </Link>
            ) : null}
            <Link href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-brand-chocolate">
              WhatsApp
            </Link>
          </div>
        </div>
        <div className="grid gap-6 text-sm text-brand-chocolate/80 sm:grid-cols-2 md:gap-10">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-brand-chocolate">{tNav("services")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/services`} className="hover:text-brand-chocolate">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/portfolio`} className="hover:text-brand-chocolate">
                  {tNav("portfolio")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/reviews`} className="hover:text-brand-chocolate">
                  {tNav("reviews")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-brand-chocolate">{tNav("contacts")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/faq`} className="hover:text-brand-chocolate">
                  {tNav("faq")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacts`} className="hover:text-brand-chocolate">
                  {tNav("contacts")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-brand-chocolate">
                  {tFooter("privacy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-brand-chocolate">
                  {tFooter("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-cocoa/10 bg-white/70 py-4 text-center text-xs text-brand-cocoa/70">
        {tFooter("rights", { year })}
      </div>
    </footer>
  );
}
