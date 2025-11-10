import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/queries/public";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/site/section-title";

type ServicePageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Услуга не найдена — PM BY MADI"
    };
  }

  return {
    title: `${service.title} — PM BY MADI`,
    description:
      service.excerpt ??
      `Перманентный макияж ${service.title.toLowerCase()} от студии PM BY MADI: деликатная техника и индивидуальный подход.`
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const otherServices =
    service.category?.services
      ?.filter((item) => item.slug !== service.slug)
      .slice(0, 3) ?? [];

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{service.category?.name}</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{service.title}</h1>
        {service.excerpt ? <p className="max-w-2xl text-lg text-muted-foreground">{service.excerpt}</p> : null}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {service.duration ? <Badge variant="subtle">{service.duration}</Badge> : null}
          <Badge variant="outline">Студия PM BY MADI</Badge>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/contacts">Записаться</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/portfolio">Смотреть портфолио</Link>
          </Button>
        </div>
      </section>

      <section className="container grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Что включает процедура</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            {service.description ? <p>{service.description}</p> : null}
            {service.preparation ? (
              <div>
                <p className="font-semibold uppercase tracking-[0.3em] text-foreground">Подготовка</p>
                <p className="mt-2 whitespace-pre-line">{service.preparation}</p>
              </div>
            ) : null}
            {service.aftercare ? (
              <div>
                <p className="font-semibold uppercase tracking-[0.3em] text-foreground">Уход</p>
                <p className="mt-2 whitespace-pre-line">{service.aftercare}</p>
              </div>
            ) : null}
            {service.contraindications ? (
              <div>
                <p className="font-semibold uppercase tracking-[0.3em] text-foreground">Противопоказания</p>
                <p className="mt-2 whitespace-pre-line">{service.contraindications}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Стоимость</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {service.prices.map((price) => (
              <div key={price.id} className="flex items-center justify-between rounded-xl border border-border/50 bg-background/70 px-4 py-3">
                <span className="text-foreground">{price.name}</span>
                <span className="font-medium text-ink">
                  {typeof price.amount === "number" ? formatCurrency(price.amount) : "По запросу"}
                </span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Итоговая стоимость может зависеть от объёма работы и необходимости коррекции. Все детали уточняются на первичной консультации.
            </p>
          </CardContent>
        </Card>
      </section>

      {otherServices.length ? (
        <section className="container space-y-8">
          <SectionTitle
            eyebrow="Другие процедуры"
            title="Также может заинтересовать"
            description="Подберите услугу, которая дополнит образ и подчеркнёт естественность."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((item) => (
              <Card key={item.id} className="border-border/50 bg-card/60">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  {item.excerpt ? <p className="text-sm text-muted-foreground">{item.excerpt}</p> : null}
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost">
                    <Link href={`/services/${item.slug}`}>Подробнее</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container rounded-3xl border border-border/60 bg-card/70 p-10 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Запись</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">Готовы обсудить детали?</h2>
            <p className="text-base text-muted-foreground">
              Напишите в мессенджер или оставьте заявку — Мадина ответит лично, чтобы подобрать оттенок, назначить дату и рассказать об уходе.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Button asChild>
              <Link href="/contacts">Оставить заявку</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://wa.me/77017774545" rel="noreferrer" target="_blank">
                WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://t.me/pm_by_madi" rel="noreferrer" target="_blank">
                Telegram
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
