import { Metadata } from "next";
import Link from "next/link";
import { getServiceCategories } from "@/lib/data";
import { getSiteSettings } from "@/lib/settings";
import { BookingForm, QuestionForm } from "@/components/forms/booking-form";

export const metadata: Metadata = {
  title: "Контакты — PM BY MADI",
  description: "Запись на перманентный макияж и вопросы о процедурах PM BY MADI."
};

type ContactsPageProps = {
  searchParams: { service?: string };
};

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
  const [settings, categories] = await Promise.all([getSiteSettings(), getServiceCategories()]);
  const query = searchParams;

  const serviceOptions = categories.flatMap((category) =>
    category.services.map((service) => ({ id: service.id, title: service.title, slug: service.slug }))
  );
  const defaultServiceId =
    serviceOptions.find((service) => service.id === query.service)?.id ??
    serviceOptions.find((service) => service.slug === query.service)?.id ??
    serviceOptions.find((service) => service.title.toLowerCase().includes((query.service ?? "").toLowerCase()))?.id;

  return (
    <div className="container py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
        <section className="space-y-6">
          <p className="eyebrow">Контакты</p>
          <h1 className="font-serif text-4xl md:text-5xl">Записаться на консультацию</h1>
          <p className="text-sm text-muted-foreground">
            Напишите, какие зоны вас интересуют, или оставьте контакты — я предложу удобное время и поделюсь чек-листом подготовки.
          </p>

          <div className="grid gap-6 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft md:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Связь</h2>
              <div className="mt-3 space-y-2 text-sm text-foreground/80">
                <Link href={`tel:${settings.contacts.phone.replace(/\s|\(|\)|-/g, "")}`} className="block hover:text-foreground">
                  {settings.contacts.phone}
                </Link>
                <Link href={`mailto:${settings.contacts.email}`} className="block hover:text-foreground">
                  {settings.contacts.email}
                </Link>
                <Link href={settings.contacts.telegram} className="block hover:text-foreground">
                  Telegram
                </Link>
                <Link href={settings.contacts.whatsapp} className="block hover:text-foreground">
                  WhatsApp
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Студия</h2>
              <div className="mt-3 space-y-2 text-sm text-foreground/80">
                <p>{settings.contacts.address}</p>
                <p>{settings.hours.weekdays}</p>
                <p>{settings.hours.weekend}</p>
                <p className="text-muted-foreground">{settings.hours.note}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-2xl">Форма записи</h2>
            <BookingForm services={serviceOptions} defaultServiceId={defaultServiceId ?? undefined} />
          </div>
        </section>

        <aside className="space-y-6">
          <div className="aspect-[4/3] overflow-hidden rounded-[32px] border border-border/60 bg-white/80 shadow-soft">
            <iframe
              src={settings.contacts.mapEmbedUrl}
              className="h-full w-full"
              loading="lazy"
              title="Kарта PM BY MADI"
              allowFullScreen
            />
          </div>

          <div className="space-y-4 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
            <h2 className="font-serif text-2xl">Вопрос</h2>
            <p className="text-sm text-muted-foreground">
              Если остались сомнения, расскажите о них. Можно приложить ссылки на референсы или описать желаемый эффект.
            </p>
            <QuestionForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
