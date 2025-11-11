import Link from "next/link";
import type { AwaitedReturnType } from "@/types/utils";
import { Separator } from "@/components/ui/separator";

type SiteSettings = AwaitedReturnType<typeof import("@/lib/settings")["getSiteSettings"]>;

interface FooterProps {
  settings: SiteSettings;
}

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  vk: "VK"
};

export function Footer({ settings }: FooterProps) {
  const socialEntries = Object.entries(settings.socials).filter(([, value]) => Boolean(value));

  return (
    <footer className="mt-24 border-t border-border/60 bg-background/70">
      <div className="container grid gap-10 py-16 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-2xl text-foreground">{settings.branding.brand}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{settings.branding.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">Контакты</h4>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>
              <Link href={`tel:${settings.contacts.phone.replace(/\s|\(|\)|-/g, "")}`} className="hover:text-foreground">
                {settings.contacts.phone}
              </Link>
            </li>
            <li>
              <Link href={`mailto:${settings.contacts.email}`} className="hover:text-foreground">
                {settings.contacts.email}
              </Link>
            </li>
            <li>{settings.contacts.address}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">Часы работы</h4>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>{settings.hours.weekdays}</li>
            <li>{settings.hours.weekend}</li>
            <li className="text-muted-foreground">{settings.hours.note}</li>
          </ul>
        </div>
      </div>

      <Separator className="border-border/60" />

      <div className="container flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <span>© {new Date().getFullYear()} PM BY MADI</span>
          <Link href="/policy" className="hover:text-foreground">
            Политика конфиденциальности
          </Link>
          <Link href="/oferta" className="hover:text-foreground">
            Публичная оферта
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socialEntries.map(([key, url]) => (
            <Link key={key} href={url as string} className="hover:text-foreground" target="_blank" rel="noreferrer">
              {socialLabels[key] ?? key}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
