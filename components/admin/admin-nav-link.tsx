"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AdminNavLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export function AdminNavLink({ href, label, icon: Icon }: AdminNavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-brand-100/80 text-ink shadow-inner"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
      href={href}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
