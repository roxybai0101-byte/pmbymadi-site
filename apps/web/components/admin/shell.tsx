"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon, XIcon, LogOutIcon, LayoutDashboardIcon, ImagesIcon, BookCopyIcon, MessageCircleIcon, Settings2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { Button } from "@pmby/ui";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/admin/services", label: "Services", icon: BookCopyIcon },
  { href: "/admin/portfolio", label: "Portfolio", icon: ImagesIcon },
  { href: "/admin/reviews", label: "Reviews", icon: MessageCircleIcon },
  { href: "/admin/faq", label: "FAQ", icon: MessageCircleIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings2Icon }
];

interface AdminShellProps {
  children: React.ReactNode;
  userEmail: string;
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-powder">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-brand-cocoa/10 bg-white/95 p-6 shadow-soft transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-brand-chocolate">
            PM BY MADI
          </Link>
          <button
            type="button"
            className="rounded-full border border-brand-cocoa/20 p-2 text-brand-chocolate lg:hidden"
            onClick={() => setOpen(false)}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-8 space-y-2">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-brand-cocoa text-white shadow-soft"
                    : "text-brand-chocolate/70 hover:bg-brand-powder hover:text-brand-chocolate"
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-10 text-sm text-brand-cocoa/70">
          <p className="font-medium text-brand-chocolate">{userEmail}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col lg:ml-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-brand-cocoa/10 bg-white/80 px-6 py-4 backdrop-blur">
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-brand-cocoa/20 p-2 text-brand-chocolate lg:hidden"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="h-4 w-4" />
          </button>
          <h1 className="text-lg font-serif text-brand-chocolate">Admin</h1>
          <div className="hidden lg:block">
            <span className="text-sm text-brand-cocoa/70">{userEmail}</span>
          </div>
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
