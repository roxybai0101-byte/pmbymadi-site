import { cache } from "react";
import { prisma } from "@/lib/prisma";

type JsonRecord = Record<string, unknown>;

const DEFAULT_SEO = {
  title: "PM BY MADI — перманентный макияж, который подчёркивает природную красоту",
  description:
    "Перманентный макияж бровей, губ и век в деликатных техниках. Premium-пигменты, мягкие градиенты, индивидуальная палитра и поддержка после процедуры.",
  keywords: [
    "перманентный макияж",
    "пудровые брови",
    "перманент губы",
    "перманент век",
    "PM BY MADI",
    "пм бровей Москва"
  ],
  siteUrl: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  openGraphImages: ["/og-image.svg"]
};

const DEFAULT_BRANDING = {
  brand: "PM BY MADI",
  tagline: "Перманентный макияж, который подчёркивает природную красоту",
  logoText: "PM BY MADI",
  logoUrl: null as string | null
};

const DEFAULT_CONTACTS = {
  phone: "+7 (999) 123-45-67",
  email: "hello@pm-by-madi.ru",
  whatsapp: "https://wa.me/79991234567",
  telegram: "https://t.me/pm_by_madi",
  address: "Москва, Большая Никитская, 23",
  mapEmbedUrl:
    "https://yandex.ru/map-widget/v1/?um=constructor%3A0c664afdb2ed4fe9f23e8eab46d76360&source=constructor"
};

const DEFAULT_SOCIALS = {
  instagram: "https://www.instagram.com/pm.by.madi",
  telegram: "https://t.me/pm_by_madi",
  whatsapp: "https://wa.me/79991234567",
  vk: "https://vk.com/pm_by_madi"
};

const DEFAULT_HOURS = {
  weekdays: "Пн–Пт: 10:00 — 20:00",
  weekend: "Сб–Вс: 11:00 — 18:00",
  note: "По предварительной записи"
};

const DEFAULT_HERO = {
  headline: "Перманентный макияж, который подчёркивает природную красоту",
  subheadline:
    "Деликатная техника, идеальные оттенки и бережный уход. Работы выглядят естественно — утром, днём и вечером.",
  ctaLabel: "Записаться",
  ctaLink: "/contacts#booking",
  secondaryCtaLabel: "Портфолио",
  secondaryCtaLink: "/portfolio"
};

const KNOWN_SETTINGS = [
  "seo.defaults",
  "site.branding",
  "site.contacts",
  "site.socials",
  "site.hours",
  "site.hero"
] as const;

async function getSettingValue<T extends JsonRecord | string | string[] | null>(
  key: string,
  fallback: T
): Promise<T> {
  const record = await prisma.setting.findUnique({
    where: { key }
  });
  if (!record) {
    return fallback;
  }

  return (record.value as T) ?? fallback;
}

export const getSeoDefaults = cache(async () => {
  const [seoRaw, brandingRaw] = await Promise.all([
    getSettingValue<JsonRecord>("seo.defaults", DEFAULT_SEO),
    getSettingValue<JsonRecord>("site.branding", DEFAULT_BRANDING)
  ]);

  const seo = { ...DEFAULT_SEO, ...seoRaw } as typeof DEFAULT_SEO & JsonRecord;
  const branding = { ...DEFAULT_BRANDING, ...brandingRaw } as typeof DEFAULT_BRANDING & JsonRecord;

  const siteUrl = typeof seo.siteUrl === "string" ? seo.siteUrl : DEFAULT_SEO.siteUrl;
  const keywordsArray = Array.isArray(seo.keywords) ? seo.keywords : DEFAULT_SEO.keywords;
  const ogImages =
    Array.isArray(seo.openGraphImages) && seo.openGraphImages.length > 0
      ? seo.openGraphImages
      : DEFAULT_SEO.openGraphImages;

  return {
    title: String(seo.title ?? DEFAULT_SEO.title),
    description: String(seo.description ?? DEFAULT_SEO.description),
    siteUrl,
    brand: String(branding.brand ?? DEFAULT_BRANDING.brand),
    metadataBase: new URL(siteUrl),
    openGraphImages: ogImages.map((url) => ({
      url: typeof url === "string" ? url : DEFAULT_SEO.openGraphImages[0],
      width: 1200,
      height: 630,
      alt: "PM BY MADI — перманентный макияж"
    })),
    keywords: keywordsArray.join(", ")
  };
});

export const getSiteSettings = cache(async () => {
  const records = await prisma.setting.findMany({
    where: {
      key: {
        in: KNOWN_SETTINGS as readonly string[]
      }
    }
  });

  const map = new Map(records.map((item) => [item.key, item.value as JsonRecord]));

  const branding = { ...DEFAULT_BRANDING, ...(map.get("site.branding") ?? {}) };
  const contacts = { ...DEFAULT_CONTACTS, ...(map.get("site.contacts") ?? {}) };
  const socials = { ...DEFAULT_SOCIALS, ...(map.get("site.socials") ?? {}) };
  const hours = { ...DEFAULT_HOURS, ...(map.get("site.hours") ?? {}) };
  const hero = { ...DEFAULT_HERO, ...(map.get("site.hero") ?? {}) };

  return {
    branding,
    contacts,
    socials,
    hours,
    hero
  };
});
