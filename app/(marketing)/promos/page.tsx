import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPromos } from "@/lib/queries/public";
import { PromoBanner } from "@/components/site/promo-banner";
import { SectionTitle } from "@/components/site/section-title";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PromosPage() {
  const promos = await getPromos();
  const highlight = promos.at(0) ?? null;
  const rest = highlight ? promos.slice(1) : promos;

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Акции</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
          Специальные предложения PM BY MADI
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Отслеживайте выгодные предложения студии: скидки на коррекцию, комплименты новым гостям и сезонные бонусы для
          постоянных клиентов.
        </p>
      </section>

      {highlight ? <PromoBanner promo={highlight} /> : null}

      <section className="container space-y-10">
        <SectionTitle
          eyebrow="Архив предложений"
          title="Другие акции и бонусы"
          description="Следите за обновлениями — новые предложения появляются каждый сезон. Подписчики в Instagram узнают первыми."
          actions={
            <Button asChild variant="ghost">
              <Link href="https://instagram.com/pm.by.madi" rel="noreferrer" target="_blank">
                Instagram
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((promo) => (
            <Card key={promo.id} className="border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="text-2xl">{promo.title}</CardTitle>
                {promo.excerpt ? <CardDescription>{promo.excerpt}</CardDescription> : null}
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {promo.body ? <p>{promo.body}</p> : null}
                <Button asChild variant="outline">
                  <Link href="/contacts">Записаться</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
