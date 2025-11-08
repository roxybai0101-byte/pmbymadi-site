import { defaultLocale } from "../next-intl.config";
import type { AppLocale } from "./i18n";

export type LocalizedJSON = Record<string, string> | null | undefined;

export function localize(value: LocalizedJSON, locale: AppLocale, fallback: AppLocale = defaultLocale) {
  if (!value) return "";
  if (typeof value === "string") return value;

  return value[locale] ?? value[fallback] ?? Object.values(value)[0] ?? "";
}

export function makeLocalized<T extends Record<string, unknown>>(value: T | null, locale: AppLocale) {
  if (!value) return {};
  return Object.fromEntries(
    Object.entries(value).map(([key, val]) => {
      if (typeof val === "object" && val !== null) {
        return [key, localize(val as LocalizedJSON, locale)];
      }
      return [key, val];
    })
  );
}
