"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { LocaleSwitcher } from "../locale-switcher";
import type { AppLocale } from "../../lib/i18n";
import { buildWhatsappUrl } from "../../lib/utils";

interface MarketingHeaderProps {
  locale: AppLocale;
  whatsappPhone?: string | null;
}

export function MarketingHeader({ locale, whatsappPhone }: MarketingHeaderProps) {
  const tNav = useTranslations("navigation");
  const hero = useTranslations("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappLink = useMemo(
    () =>
      buildWhatsappUrl(
        whatsappPhone ?? process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "+48000000000",
        locale === "ru" ? "Здравствуйте! Хочу записаться в PM BY MADI." : "Hello! I'd love to book an appointment at PM BY MADI."
      ),
    [locale, whatsappPhone]
  );

  const items = [
    { key: "services", href: `/${locale}/services` },
    { key: "portfolio", href: `/${locale}/portfolio` },
    { key: "reviews", href: `/${locale}/reviews` },
    { key: "faq", href: `/${locale}/faq` },
    { key: "contacts", href: `/${locale}/contacts` }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-brand-cocoa/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/pm-by-madi-logo.svg" alt="PM BY MADI" width={140} height={40} priority />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-chocolate/80 lg:flex">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="transition hover:text-brand-chocolate"
            >
              {tNav(item.key as Parameters<typeof tNav>[0])}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <Link
            href={whatsappLink ?? "#"}
            className="rounded-3xl bg-brand-cocoa px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-soft transition hover:bg-brand-chocolate"
          >
            {hero("ctaPrimary")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-brand-cocoa/30 p-2 text-brand-chocolate lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-brand-cocoa/10 bg-white/95 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-brand-chocolate/80">
            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl bg-brand-powder/50 px-4 py-3 transition hover:bg-brand-powder"
              >
                {tNav(item.key as Parameters<typeof tNav>[0])}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LocaleSwitcher />
            <Link
              href={whatsappLink ?? "#"}
              className="rounded-3xl bg-brand-cocoa px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-soft transition hover:bg-brand-chocolate"
            >
              {hero("ctaPrimary")}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
