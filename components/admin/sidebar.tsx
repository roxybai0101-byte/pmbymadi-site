"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Услуги", href: "/admin/services" },
  { label: "Портфолио", href: "/admin/portfolio" },
  { label: "Отзывы", href: "/admin/reviews" },
  { label: "Акции", href: "/admin/promos" },
  { label: "Блог", href: "/admin/blog" },
  { label: "Страницы", href: "/admin/pages" },
  { label: "Медиа", href: "/admin/media" },
  { label: "Заявки", href: "/admin/submissions" },
  { label: "Настройки", href: "/admin/settings" }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full min-w-[240px] flex-col gap-6 border-r border-border/60 bg-white/70 p-6">
      <Link href="/admin" className="flex flex-col gap-1">
        <span className="font-serif text-2xl text-foreground">PM BY MADI</span>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Админ-панель</span>
      </Link>

      <nav className="grow space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-xl px-4 py-2 text-sm font-medium transition",
                isActive ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted/60"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Button
        variant="outline"
        className="flex items-center gap-2 rounded-xl text-sm"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
      >
        <LogOut className="h-4 w-4" />
        Выйти
      </Button>
    </aside>
  );
}
