import Link from "next/link";

type SiteFooterProps = {
  address: string;
  whatsapp: string;
  whatsappLink: string;
  telegram?: string | null;
  instagram?: string | null;
  email?: string | null;
};

const footerLinks = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "Отзывы", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакты", href: "/contacts" },
  { label: "Политика конфиденциальности", href: "/privacy" }
];

export function SiteFooter({
  address,
  whatsapp,
  whatsappLink,
  telegram,
  instagram,
  email
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-brand-warm/30 bg-brand-powder/60">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">
            PM BY MADI
          </span>
          <p className="font-serif text-2xl text-brand-chocolate">
            Премиальный перманентный макияж
          </p>
          <p className="text-sm leading-relaxed text-brand-cocoa/80">{address}</p>
          <div className="space-y-1 text-sm text-brand-cocoa/80">
            <p>
              WhatsApp:{" "}
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {whatsapp}
              </Link>
            </p>
            {telegram ? (
              <p>
                Telegram:{" "}
                <Link
                  href={telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  @{telegram.replace("https://t.me/", "")}
                </Link>
              </p>
            ) : null}
            {instagram ? (
              <p>
                Instagram:{" "}
                <Link
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  @{instagram.replace("https://instagram.com/", "")}
                </Link>
              </p>
            ) : null}
            {email ? (
              <p>
                Email:{" "}
                <Link href={`mailto:${email}`} className="underline-offset-4 hover:underline">
                  {email}
                </Link>
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
            Быстрые ссылки
          </h3>
          <ul className="mt-4 grid gap-2 text-sm text-brand-cocoa/80">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline-offset-4 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
            Записаться
          </h3>
          <p className="text-sm text-brand-cocoa/80">
            Напишите в WhatsApp, чтобы согласовать дату, пройти консультацию и получить
            памятку по подготовке.
          </p>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-brand-gold/30 bg-brand-chocolate px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brand-chocolate/90"
          >
            Записаться в WhatsApp
          </Link>
        </div>
      </div>
      <div className="border-t border-brand-warm/20 bg-brand-powder/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-brand-cocoa/60 md:flex-row">
          <span>© {year} PM BY MADI. Все права защищены.</span>
          <span>Сайт разработан с любовью к мягкой эстетике.</span>
        </div>
      </div>
    </footer>
  );
}
