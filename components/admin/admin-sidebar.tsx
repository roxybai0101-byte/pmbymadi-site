import {
  LayoutDashboard,
  Scissors,
  Layers,
  Images,
  MessageCircle,
  Sparkles,
  FileText,
  BookOpen,
  ImageDown,
  Inbox,
  Settings2
} from "lucide-react";
import { AdminNavLink } from "@/components/admin/admin-nav-link";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Услуги", icon: Scissors },
  { href: "/admin/services/categories", label: "Категории", icon: Layers },
  { href: "/admin/portfolio", label: "Портфолио", icon: Images },
  { href: "/admin/reviews", label: "Отзывы", icon: MessageCircle },
  { href: "/admin/promos", label: "Акции", icon: Sparkles },
  { href: "/admin/blog", label: "Блог", icon: BookOpen },
  { href: "/admin/pages", label: "Страницы", icon: FileText },
  { href: "/admin/media", label: "Медиа", icon: ImageDown },
  { href: "/admin/submissions", label: "Заявки", icon: Inbox },
  { href: "/admin/settings", label: "Настройки", icon: Settings2 }
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-border/60 bg-card/60 p-6 md:flex">
      <div className="mb-8 space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">PM BY MADI</p>
        <h2 className="font-serif text-2xl text-foreground">Админ-панель</h2>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <AdminNavLink key={item.href} {...item} />
        ))}
      </nav>
      <p className="mt-8 text-xs text-muted-foreground">Последнее обновление контента через админку</p>
    </aside>
  );
}
