import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteSettings } from "@/lib/queries/site";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader whatsappLink={settings.whatsappLink} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        address={settings.address}
        whatsapp={settings.whatsapp}
        whatsappLink={settings.whatsappLink}
        telegram={settings.telegram}
        instagram={settings.instagram}
        email={settings.email}
      />
    </div>
  );
}
