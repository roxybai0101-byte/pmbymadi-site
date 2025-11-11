"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  whatsappLink: string;
};

const navigation = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "Отзывы", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" }
];

export function SiteHeader({ whatsappLink }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-brand-powder/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-brand-gold/30 bg-brand-white shadow-subtle">
            <Image
              src="/pm-by-madi-logo.svg"
              alt="Логотип PM BY MADI"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">
              PM BY MADI
            </span>
            <p className="font-serif text-lg text-brand-chocolate">
              Премиальный перманентный макияж
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-brand-warm/40 bg-white/70 px-3 py-2 shadow-soft md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-brand-cocoa transition hover:bg-brand-powder/80",
                isActive(item.href) && "bg-brand-chocolate text-white shadow-subtle"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button asChild size="sm">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Записаться в WhatsApp
            </Link>
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen ? (
        <div className="md:hidden">
          <nav className="mx-6 mb-4 space-y-2 rounded-3xl border border-brand-warm/40 bg-white/90 p-4 shadow-soft">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-brand-chocolate transition hover:bg-brand-powder/70",
                  isActive(item.href) && "bg-brand-powder/90"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="w-full">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                Записаться в WhatsApp
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
