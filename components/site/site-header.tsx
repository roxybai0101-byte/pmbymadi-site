import Link from "next/link";
import { SiteMobileNav } from "@/components/site/site-mobile-nav";
import type { ContactSettingValue, SiteSettingValue } from "@/types/content";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/promos", label: "Акции" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О мастере" },
  { href: "/contacts", label: "Контакты" }
];

type SiteHeaderProps = {
  site: SiteSettingValue;
  contacts: ContactSettingValue;
};

export function SiteHeader({ site, contacts }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-200 font-serif text-lg">
            PM
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-semibold tracking-tight">{site.name ?? "PM BY MADI"}</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">permanent studio</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {contacts.phone ? (
            <Link
              className="text-sm font-semibold text-ink transition hover:text-ink/80"
              href={`tel:${contacts.phone.replace(/\s/g, "")}`}
            >
              {contacts.phone}
            </Link>
          ) : null}
          <Button asChild size="sm">
            <Link href={site.cta?.href ?? "/contacts"}>{site.cta?.label ?? "Записаться"}</Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <SiteMobileNav contacts={contacts} navLinks={navLinks} site={site} />
        </div>
      </div>
    </header>
  );
}
