import Link from "next/link";

import type { SiteSetting } from "@prisma/client";

import { SectionHeader } from "@/components/marketing/section-header";
import { Button } from "@/components/ui/button";

type ContactsSectionProps = {
  settings: SiteSetting;
};

export function ContactsSection({ settings }: ContactsSectionProps) {
  return (
    <section className="section-padding bg-brand-powder/50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-[34px] border border-brand-warm/40 bg-white/90 p-10 shadow-soft md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Контакты"
            title="Давайте познакомимся"
            description="Запишитесь на процедуру или задайте вопрос. Отвечаю оперативно и подскажу, как подготовиться."
          />
          <div className="space-y-4 text-sm text-brand-cocoa/80">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">WhatsApp</p>
              <Link
                href={settings.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-brand-chocolate underline-offset-4 hover:underline"
              >
                {settings.whatsapp}
              </Link>
            </div>
            {settings.telegram ? (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">Telegram</p>
                <Link
                  href={settings.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-brand-chocolate underline-offset-4 hover:underline"
                >
                  @{settings.telegram.replace("https://t.me/", "")}
                </Link>
              </div>
            ) : null}
            {settings.instagram ? (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">Instagram</p>
                <Link
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-brand-chocolate underline-offset-4 hover:underline"
                >
                  @{settings.instagram.replace("https://instagram.com/", "")}
                </Link>
              </div>
            ) : null}
            {settings.email ? (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">Email</p>
                <Link
                  href={`mailto:${settings.email}`}
                  className="text-base font-semibold text-brand-chocolate underline-offset-4 hover:underline"
                >
                  {settings.email}
                </Link>
              </div>
            ) : null}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">Адрес студии</p>
              <p className="text-base font-semibold text-brand-chocolate">{settings.address}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={settings.whatsappLink} target="_blank" rel="noopener noreferrer">
                Написать в WhatsApp
              </Link>
            </Button>
            {settings.telegram ? (
              <Button asChild variant="outline">
                <Link href={settings.telegram} target="_blank" rel="noopener noreferrer">
                  Telegram
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex-1 overflow-hidden rounded-[28px] border border-brand-gold/30 bg-brand-powder/80 shadow-soft">
            {settings.latitude && settings.longitude ? (
              <iframe
                title="Карта студии PM BY MADI"
                src={`https://www.google.com/maps?q=${settings.latitude},${settings.longitude}&hl=ru&z=16&output=embed`}
                allowFullScreen
                loading="lazy"
                className="h-full w-full border-0"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-brand-cocoa/70">
                Локация уточняется при подтверждении записи.
              </div>
            )}
          </div>
          <p className="text-xs text-brand-cocoa/60">
            * Принимаю по предварительной записи. Адрес уточняется при подтверждении визита.
          </p>
        </div>
      </div>
    </section>
  );
}
