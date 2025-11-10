import { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { getSiteSettings } from "@/lib/queries/public";
import type { ContactSettingValue, SiteSettingValue } from "@/types/content";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();
  const site = settings.site as SiteSettingValue;
  const contacts = settings.contacts as ContactSettingValue;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader contacts={contacts} site={site} />
      <main className="flex-1">{children}</main>
      <SiteFooter contacts={contacts} site={site} />
    </div>
  );
}
