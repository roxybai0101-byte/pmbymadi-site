import Link from "next/link";
import { DesktopNav, MobileNav } from "@/components/site/navigation";
import type { AwaitedReturnType } from "@/types/utils";
import { Button } from "@/components/ui/button";

type SiteSettings = AwaitedReturnType<typeof import("@/lib/settings")["getSiteSettings"]>;

const NAV_ITEMS = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Акции", href: "/promos" },
  { label: "Блог", href: "/blog" },
  { label: "О мастере", href: "/master" },
  { label: "Контакты", href: "/contacts" }
];

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-[88px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-sm font-semibold tracking-[0.3em] text-foreground/80 shadow-soft">
            PM
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-xl tracking-tight text-foreground">{settings.branding.brand}</span>
            <span className="text-xs uppercase tracking-[0.4em] text-foreground/50">Perma Make-up</span>
          </span>
        </Link>

        <DesktopNav items={NAV_ITEMS} className="flex-1 justify-center" />

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild className="rounded-xl">
            <Link href="/contacts#booking">Записаться</Link>
          </Button>
        </div>

        <MobileNav items={NAV_ITEMS} />
      </div>
    </header>
  );
}
