import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { locales } from "../../next-intl.config";
import { MarketingProviders } from "../../components/providers";

export { generateStaticParams } from "../../lib/i18n";

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MarketingProviders locale={locale}>{children}</MarketingProviders>
    </NextIntlClientProvider>
  );
}
