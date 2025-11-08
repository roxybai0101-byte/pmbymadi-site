"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import { locales } from "../next-intl.config";
import { useClientLocale } from "./providers";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useClientLocale();
  const [isPending, startTransition] = useTransition();

  const onSwitch = (locale: string) => {
    if (locale === activeLocale) return;
    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = locale;
      const nextPath = segments.join("/") || `/${locale}`;
      router.push(nextPath);
    });
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-brand-cocoa/20 bg-white/70 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onSwitch(locale)}
          disabled={isPending}
          className={`rounded-full px-3 py-1 transition ${
            locale === activeLocale
              ? "bg-brand-cocoa text-white shadow-soft"
              : "text-brand-chocolate/70 hover:text-brand-chocolate"
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
