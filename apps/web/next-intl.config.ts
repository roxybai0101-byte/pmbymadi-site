import { LocalePrefix } from "next-intl/routing";

export const locales = ["ru", "en"] as const;

export const defaultLocale = "ru";

export const localePrefix: LocalePrefix = "always";

export type AppLocale = (typeof locales)[number];

export default {
  locales,
  defaultLocale,
  localePrefix
};
