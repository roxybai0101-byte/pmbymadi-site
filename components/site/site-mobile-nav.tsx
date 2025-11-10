"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { ContactSettingValue, SiteSettingValue } from "@/types/content";
import { Separator } from "@/components/ui/separator";

type NavLink = {
  href: string;
  label: string;
};

type SiteMobileNavProps = {
  site: SiteSettingValue;
  contacts: ContactSettingValue;
  navLinks: NavLink[];
};

export function SiteMobileNav({ contacts, navLinks, site }: SiteMobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-11 w-11 rounded-full border border-border/60 bg-transparent text-foreground" variant="ghost">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-8" side="right">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">{site.name ?? "PM BY MADI"}</SheetTitle>
          <p className="text-sm text-muted-foreground">{site.tagline}</p>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} className="text-lg font-medium text-foreground" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Separator />
        <div className="space-y-3 text-sm text-muted-foreground">
          {contacts.phone ? (
            <div>
              <p className="font-semibold text-foreground">Телефон</p>
              <Link className="block text-base text-foreground" href={`tel:${contacts.phone}`}>
                {contacts.phone}
              </Link>
            </div>
          ) : null}
          {contacts.address ? (
            <div>
              <p className="font-semibold text-foreground">Адрес</p>
              <p>{contacts.address}</p>
            </div>
          ) : null}
          {contacts.instagram || contacts.telegram ? (
            <div className="flex gap-4 text-base">
              {contacts.instagram ? (
                <Link className="underline" href={contacts.instagram} target="_blank">
                  Instagram
                </Link>
              ) : null}
              {contacts.telegram ? (
                <Link className="underline" href={contacts.telegram} target="_blank">
                  Telegram
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
        <Button asChild className="w-full" size="lg">
          <Link href={site.cta?.href ?? "/contacts"}>{site.cta?.label ?? "Записаться"}</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
