import Link from "next/link";
import type { ContactSettingValue, SiteSettingValue } from "@/types/content";
import { Separator } from "@/components/ui/separator";

const navGroups = [
  {
    title: "Разделы",
    links: [
      { href: "/services", label: "Услуги" },
      { href: "/portfolio", label: "Портфолио" },
      { href: "/reviews", label: "Отзывы" },
      { href: "/blog", label: "Блог" }
    ]
  },
  {
    title: "Информация",
    links: [
      { href: "/about", label: "О мастере" },
      { href: "/contacts", label: "Контакты" },
      { href: "/faq", label: "FAQ" },
      { href: "/policy", label: "Политика" },
      { href: "/offer", label: "Оферта" }
    ]
  }
];

type SiteFooterProps = {
  site: SiteSettingValue;
  contacts: ContactSettingValue;
};

export function SiteFooter({ site, contacts }: SiteFooterProps) {
  return (
    <footer className="border-t border-border/60 bg-card/60 text-sm text-muted-foreground">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-serif text-2xl text-foreground">{site.name ?? "PM BY MADI"}</p>
          <p>{site.subheading}</p>
          {contacts.address ? (
            <div>
              <p className="font-semibold text-foreground">Студия:</p>
              <p>{contacts.address}</p>
            </div>
          ) : null}
          {contacts.workingHours?.length ? (
            <div>
              <p className="font-semibold text-foreground">График:</p>
              <ul className="space-y-1">
                {contacts.workingHours.map((item) => (
                  <li key={item.days}>
                    <span>{item.days}</span> — <span>{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-sm font-semibold uppercase text-foreground">{group.title}</p>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-foreground" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase text-foreground">Контакты</p>
          <div className="space-y-2">
            {contacts.phone ? (
              <Link className="block transition hover:text-foreground" href={`tel:${contacts.phone}`}>
                {contacts.phone}
              </Link>
            ) : null}
            {contacts.email ? (
              <Link className="block transition hover:text-foreground" href={`mailto:${contacts.email}`}>
                {contacts.email}
              </Link>
            ) : null}
          </div>
          <div className="flex gap-4">
            {contacts.instagram ? (
              <Link className="transition hover:text-foreground" href={contacts.instagram} target="_blank">
                Instagram
              </Link>
            ) : null}
            {contacts.telegram ? (
              <Link className="transition hover:text-foreground" href={contacts.telegram} target="_blank">
                Telegram
              </Link>
            ) : null}
            {contacts.tiktok ? (
              <Link className="transition hover:text-foreground" href={contacts.tiktok} target="_blank">
                TikTok
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <Separator />
      <div className="container flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {site.name ?? "PM BY MADI"}. Все права защищены.</p>
        <p>Создано с любовью к естественной красоте.</p>
      </div>
    </footer>
  );
}
