import Link from "next/link";
import { getSiteSettings, getServiceCatalog } from "@/lib/queries/public";
import type { ContactSettingValue } from "@/types/content";
import { SubmissionForm } from "@/components/forms/submission-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/site/section-title";

export default async function ContactsPage() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getServiceCatalog()]);
  const contacts = (settings.contacts as ContactSettingValue) ?? {};
  const exampleService = categories.flatMap((category) => category.services).at(0)?.title ?? "Пудровые брови";

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Контакты</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">Запись в студию PM BY MADI</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Заполните форму или напишите в удобный мессенджер. Мы уточним желаемый результат, подберём дату и расскажем о подготовке.
        </p>
      </section>

      <section className="container grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Контактные данные</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground">Адрес</p>
              <p className="mt-2 text-base text-foreground">{contacts.address ?? "Алматы, студия PM BY MADI"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground">Телефон</p>
              {contacts.phone ? (
                <Link className="mt-2 block text-base text-foreground" href={`tel:${contacts.phone}`}>
                  {contacts.phone}
                </Link>
              ) : null}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground">Мессенджеры</p>
              <div className="mt-2 flex flex-wrap gap-4 text-base">
                {contacts.whatsapp ? (
                  <Link className="underline-offset-8 hover:underline" href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}`} target="_blank">
                    WhatsApp
                  </Link>
                ) : null}
                {contacts.telegram ? (
                  <Link className="underline-offset-8 hover:underline" href={contacts.telegram} target="_blank">
                    Telegram
                  </Link>
                ) : null}
                {contacts.instagram ? (
                  <Link className="underline-offset-8 hover:underline" href={contacts.instagram} target="_blank">
                    Instagram
                  </Link>
                ) : null}
              </div>
            </div>
            {contacts.workingHours?.length ? (
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground">График</p>
                <ul className="mt-2 space-y-1">
                  {contacts.workingHours.map((item) => (
                    <li key={item.days}>
                      <span className="text-foreground">{item.days}</span> — {item.time}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <SubmissionForm
            description="Оставьте контакты, чтобы мы подтвердили точную дату и рассказали о подготовке."
            servicePlaceholder={`Например: ${exampleService}`}
            title="Записаться на процедуру"
            type="BOOKING"
          />
          <SubmissionForm
            compact
            description="Если не нашли ответ в FAQ — напишите, и мы подскажем."
            submitLabel="Отправить вопрос"
            title="Задать вопрос"
            type="QUESTION"
          />
        </div>
      </section>

      {contacts.mapEmbed ? (
        <section className="container space-y-6">
          <SectionTitle eyebrow="Как добраться" title="Студия PM BY MADI на карте" />
          <div className="overflow-hidden rounded-3xl border border-border/60">
            <iframe className="h-[380px] w-full" loading="lazy" src={contacts.mapEmbed} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
