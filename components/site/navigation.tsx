"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="icon"
        className="h-11 w-11 rounded-full border-border/60 bg-white/80 shadow-soft backdrop-blur"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Открыть меню</span>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/95 px-6 py-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl">Меню</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full">
              <X className="h-5 w-5" />
              <span className="sr-only">Закрыть меню</span>
            </Button>
          </div>
          <nav className="mt-10 flex flex-col gap-4 text-lg">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-transparent bg-white/50 px-4 py-3 text-foreground shadow-sm transition hover:border-border hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

interface DesktopNavProps {
  items: NavItem[];
  className?: string;
}

export function DesktopNav({ items, className }: DesktopNavProps) {
  return (
    <nav className={cn("hidden gap-6 md:flex", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-foreground/80 transition hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
