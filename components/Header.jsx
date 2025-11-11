'use client';

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import site from "@/data/site.json";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "О мастере" },
  { href: "#services", label: "Услуги" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <Link href="/" className="flex flex-col gap-1 text-ink" onClick={closeMenu}>
          <span className="text-xs font-medium uppercase tracking-[0.46em] text-ink/60">
            {site.brand}
          </span>
          <span className="font-serif text-lg leading-none md:text-xl">
            PM BY MADI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.28em] text-ink/60 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="#booking" variant="primary" size="sm">
            {site.ctaText}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className="sr-only">Меню</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "md:hidden",
          "absolute inset-x-0 top-[calc(var(--header-height))] origin-top overflow-hidden border-b border-white/40 bg-white/95 backdrop-blur-xl transition-transform duration-300",
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-6 px-6 pb-8 pt-6 text-sm uppercase tracking-[0.32em] text-ink/70">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Button href="#booking" variant="primary" size="md" className="mt-4">
            {site.ctaText}
          </Button>
          <div className="flex flex-col gap-3 text-xs tracking-[0.36em] text-ink/40">
            <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-ink/70">
              TELEGRAM
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-ink/70">
              WHATSAPP
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
