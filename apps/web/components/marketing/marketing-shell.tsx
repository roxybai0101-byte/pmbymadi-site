import type { ReactNode } from "react";

import type { AppLocale } from "../../lib/i18n";
import { MarketingHeader } from "./navigation";
import { MarketingFooter } from "./footer";

interface MarketingShellProps {
  locale: AppLocale;
  children: ReactNode;
  settings?: {
    whatsappPhone?: string | null;
    instagramUrl?: string | null;
    telegramUrl?: string | null;
    address?: string | null;
  };
}

export function MarketingShell({ locale, children, settings }: MarketingShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-powder text-brand-chocolate">
      <div className="pointer-events-none absolute inset-x-0 top-[-40rem] h-[60rem] rounded-full bg-hero-gradient opacity-80 blur-3xl" />
      <MarketingHeader locale={locale} whatsappPhone={settings?.whatsappPhone} />
      <main className="relative z-10">{children}</main>
      <MarketingFooter
        locale={locale}
        whatsappPhone={settings?.whatsappPhone}
        instagramUrl={settings?.instagramUrl}
        telegramUrl={settings?.telegramUrl}
        address={settings?.address}
      />
    </div>
  );
}
