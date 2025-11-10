import Link from "next/link";
import { getServiceCatalog } from "@/lib/queries/public";
import { SectionTitle } from "@/components/site/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default async function ServicesPage() {
  const categories = await getServiceCatalog();

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Услуги</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">Каталог процедур PM BY MADI</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Каждая процедура подбирается индивидуально — от оттенка пигмента до формы. Работаем с гипоаллергенными
          составами и уделяем особое внимание подготовке и уходу.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contacts">Записаться</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/faq">FAQ по процедурам</Link>
          </Button>
        </div>
      </section>

      <section className="container space-y-16">
        {categories.map((category) => (
          <div key={category.id} className="space-y-8">
            <SectionTitle eyebrow="Категория" title={category.name} description={category.description ?? undefined} />
            <div className="space-y-10">
              {category.services.map((service) => (
                <Card key={service.id} className="overflow-hidden border-border/60 bg-card/70">
                  <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-3">
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      {service.excerpt ? <CardDescription>{service.excerpt}</CardDescription> : null}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        {service.duration ? (
                          <span className="rounded-full bg-brand-50 px-3 py-1 text-ink">{service.duration}</span>
                        ) : null}
                        <Badge variant="subtle">{category.name}</Badge>
                      </div>
                    </div>
                    <Button asChild variant="ghost">
                      <Link href={`/services/${service.slug}`}>Подробнее</Link>
                    </Button>
                  </CardHeader>
                  <Separator />
                  <CardContent className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                    <div className="space-y-6 text-sm text-muted-foreground">
                      {service.description ? (
                        <div>
                          <p className="font-semibold uppercase tracking-[0.3em] text-foreground">О процедуре</p>
                          <p className="mt-3 leading-relaxed">{service.description}</p>
                        </div>
                      ) : null}
                      {service.preparation ? (
                        <div>
                          <p className="font-semibold uppercase tracking-[0.3em] text-foreground">Подготовка</p>
                          <p className="mt-3 whitespace-pre-line leading-relaxed">{service.preparation}</p>
                        </div>
                      ) : null}
                      {service.aftercare ? (
                        <div>
                          <p className="font-semibold uppercase tracking-[0.3em] text-foreground">Уход</p>
                          <p className="mt-3 whitespace-pre-line leading-relaxed">{service.aftercare}</p>
                        </div>
                      ) : null}
                      {service.contraindications ? (
                        <div>
                          <p className="font-semibold uppercase tracking-[0.3em] text-foreground">Противопоказания</p>
                          <p className="mt-3 whitespace-pre-line leading-relaxed">{service.contraindications}</p>
                        </div>
                      ) : null}
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Стоимость</p>
                      <div className="space-y-3 rounded-2xl border border-border/50 bg-background/60 p-6">
                        {service.prices.map((price) => (
                          <div key={price.id} className="flex items-baseline justify-between text-sm">
                            <span className="text-foreground">{price.name}</span>
                            <span className="font-medium text-ink">
                              {typeof price.amount === "number" ? formatCurrency(price.amount) : "по запросу"}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/services/${service.slug}`}>Записаться на процедуру</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="container rounded-3xl border border-border/60 bg-card/60 p-10 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Как проходит консультация</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">Деликатность на каждом этапе</h2>
            <p className="text-base text-muted-foreground">
              Обсудим ваши ожидания, составим индивидуальный план, подберём оттенок и дадим памятку по подготовке. На
              процедуре используется одноразовая стерильная продукция, а после вы получаете подробный гайд по уходу.
            </p>
          </div>
          <div className="space-y-4 rounded-2xl border border-border/60 bg-background/80 p-6 text-sm text-muted-foreground">
            <p>
              Записаться можно через форму на сайте, WhatsApp или Instagram. Ответим в течение рабочего дня, предложим
              ближайшие свободные даты и уточним противопоказания.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contacts">Оставить заявку</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://t.me/pm_by_madi" rel="noreferrer" target="_blank">
                  Написать в Telegram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
