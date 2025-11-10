import Link from "next/link";
import { getPortfolio } from "@/lib/queries/public";
import { SectionTitle } from "@/components/site/section-title";
import { PortfolioCard } from "@/components/site/portfolio-card";
import { Button } from "@/components/ui/button";

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Портфолио</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">Работы PM BY MADI</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Подборка результатов процедур: натуральные брови, акварельные губы, стрелки и межресничка. Все фотографии
          сделаны в студии сразу после процедуры или после заживления.
        </p>
        <Button asChild>
          <Link href="/contacts">Записаться на консультацию</Link>
        </Button>
      </section>

      <section className="container space-y-8">
        <SectionTitle
          eyebrow="Галерея"
          title="Натуральный эффект в деталях"
          description="Каждый образ создаётся под особенности лица. Листайте, чтобы увидеть разные техники и оттенки."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="container rounded-3xl border border-border/60 bg-card/70 p-10 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Подбор образа</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">Расскажите о желаемом результате</h2>
            <p className="text-base text-muted-foreground">
              Мадина поможет выбрать технику, оттенок и форму. Перед процедурой проводим консультацию, составляем
              план и даём рекомендации по подготовке и уходу.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Button asChild>
              <Link href="/contacts">Оставить заявку</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://instagram.com/pm.by.madi" rel="noreferrer" target="_blank">
                Instagram
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
