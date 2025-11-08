import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { assertLocale, setRequestLocale } from "../../../lib/i18n";
import { prisma } from "../../../lib/prisma";
import { siteConfig, jsonLdOrganization } from "../../../content/seo";
import { MarketingShell } from "../../../components/marketing";
import type { AppLocale } from "../../../lib/i18n";

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params }: MarketingLayoutProps): Promise<Metadata> {
  const locale = assertLocale(params.locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });

  const url = `${siteConfig.url}/${locale}`;
  const ogImage = `${siteConfig.url}${settings?.defaultOgImage ?? siteConfig.ogImage}`;
  const description =
    settings?.seoDescription && typeof settings.seoDescription === "object"
      ? (settings.seoDescription as Record<string, string>)[locale] ??
        (settings.seoDescription as Record<string, string>).ru ??
        siteConfig.description[locale]
      : siteConfig.description[locale];

  return {
    title: t("defaultTitle"),
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${siteConfig.url}/ru`,
        en: `${siteConfig.url}/en`
      }
    },
    openGraph: {
      type: "website",
      locale,
      url,
      title: t("defaultTitle"),
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title: t("defaultTitle"),
      description,
      images: [ogImage]
    }
  };
}

export default async function MarketingLayout({ children, params }: MarketingLayoutProps) {
  const locale = assertLocale(params.locale) as AppLocale;
  setRequestLocale(locale);

  const settings = await prisma.settings.findUnique({ where: { id: 1 } });

  const structuredData = {
    ...jsonLdOrganization,
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}${settings?.defaultOgImage ?? siteConfig.ogImage}`,
    description: settings?.seoDescription
      ? (settings.seoDescription as Record<string, string>)[locale] ??
        (settings.seoDescription as Record<string, string>).ru
      : siteConfig.description[locale]
  };

  return (
    <MarketingShell
      locale={locale}
      settings={{
        whatsappPhone: settings?.whatsappPhone,
        instagramUrl: settings?.instagramUrl,
        telegramUrl: settings?.telegramUrl,
        address: settings?.address
      }}
    >
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </>
    </MarketingShell>
  );
}
