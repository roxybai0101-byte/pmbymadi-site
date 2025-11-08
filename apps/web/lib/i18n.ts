import { notFound } from "next/navigation";
import { getFormatter, getTranslator } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";

import { locales, defaultLocale } from "../next-intl.config";

export type AppLocale = (typeof locales)[number];

export function assertLocale(locale: string): AppLocale {
  if (locales.includes(locale as AppLocale)) {
    return locale as AppLocale;
  }
  notFound();
}

export async function getTranslations(locale: string, namespace?: string) {
  const verifiedLocale = assertLocale(locale);
  return getTranslator({ locale: verifiedLocale, namespace });
}

export async function getLocaleFormatter(locale: string) {
  const verifiedLocale = assertLocale(locale);
  return getFormatter({ locale: verifiedLocale });
}

export function setRequestLocale(locale: string) {
  const verifiedLocale = assertLocale(locale);
  unstable_setRequestLocale(verifiedLocale);
}

export function getDefaultLocale() {
  return defaultLocale;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
