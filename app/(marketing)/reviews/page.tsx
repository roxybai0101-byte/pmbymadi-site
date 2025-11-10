import { getReviews } from "@/lib/queries/public";
import { SectionTitle } from "@/components/site/section-title";
import { ReviewCard } from "@/components/site/review-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Отзывы</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">Голоса клиентов PM BY MADI</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Делимся впечатлениями тех, кто уже доверил свою естественность студии PM BY MADI. Здесь только живые эмоции
          и честные отзывы без фильтров.
        </p>
        <Button asChild>
          <Link href="/contacts">Записаться</Link>
        </Button>
      </section>

      <section className="container space-y-8">
        <SectionTitle
          eyebrow="Опыт клиентов"
          title="Почему выбирают PM BY MADI"
          description="Деликатный подход, индивидуальный подбор оттенков и поддержка после процедуры."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      <section className="container rounded-3xl border border-border/60 bg-card/70 p-10 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Готовы к переменам</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">Запланируйте свой сеанс</h2>
            <p className="text-base text-muted-foreground">
              Оставьте заявку и расскажите о желаемом эффекте. Мадина подробно ответит, подберёт технику и подготовит
              персональные рекомендации.
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
