import { getPageBySlug, getFeaturedPortfolio } from "@/lib/queries/public";
import { SectionTitle } from "@/components/site/section-title";
import { PortfolioCard } from "@/components/site/portfolio-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AboutPage() {
  const page = await getPageBySlug("about");
  const portfolio = await getFeaturedPortfolio();

  const markdown = typeof page?.content === "object" && page.content && "markdown" in page.content ? String(page.content.markdown) : "";
  const paragraphs = markdown.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">О мастере</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{page?.title ?? "PM BY MADI"}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Перманентный макияж — способ подчеркнуть природную красоту без лишней косметики. Для меня важно, чтобы вы
          чувствовали себя уверенно каждое утро.
        </p>
      </section>

      <section className="container grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Авторский подход</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-base leading-relaxed text-muted-foreground">
            {paragraphs.length ? (
              paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <>
                <p>
                  Я — Мадина, мастер перманентного макияжа. Работаю в деликатных техниках, чтобы вы выглядели свежо и
                  естественно без лишней косметики. Регулярно повышаю квалификацию и подбираю оттенки под ваш подтон и образ.
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Философия PM BY MADI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>— Натуральность важнее всего. Мы не стремимся к графике — только к деликатным акцентам.</p>
            <p>— Индивидуальность в каждой детали: от формы бровей до оттенка губ.</p>
            <p>— Безопасность и комфорт: сертифицированные пигменты и одноразовые расходники.</p>
            <p>— Поддержка после процедуры: на связи, пока результат полностью не закрепится.</p>
            <Button asChild variant="outline">
              <Link href="/contacts">Записаться на консультацию</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="container space-y-8">
        <SectionTitle
          eyebrow="Работы"
          title="Один результат лучше тысячи слов"
          description="Несколько свежих работ, где техника подчёркивает естественность, а оттенок подобран под подтон кожи."
          actions={
            <Button asChild variant="ghost">
              <Link href="/portfolio">Полное портфолио</Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.slice(0, 3).map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
