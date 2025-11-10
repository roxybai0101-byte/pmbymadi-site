import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteSettings, getServiceCatalog, getFeaturedPortfolio, getActivePromos, getReviews, getPublishedPosts } from "@/lib/queries/public";
import type { SiteSettingValue } from "@/types/content";
import { Hero } from "@/components/site/hero";
import { SectionTitle } from "@/components/site/section-title";
import { ServiceCard } from "@/components/site/service-card";
import { PortfolioCard } from "@/components/site/portfolio-card";
import { ReviewCard } from "@/components/site/review-card";
import { PostCard } from "@/components/site/post-card";
import { PromoBanner } from "@/components/site/promo-banner";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const [{ site }, categories, portfolioItems, promos, reviews, posts] = await Promise.all([
    getSiteSettings(),
    getServiceCatalog(),
    getFeaturedPortfolio(),
    getActivePromos(),
    getReviews(),
    getPublishedPosts()
  ]);

  const siteSettings = (site as SiteSettingValue) ?? {};
  const topServices = categories.flatMap((category) => category.services.map((service) => ({ ...service, category }))).slice(0, 3);
  const featuredPortfolio = portfolioItems.slice(0, 3);
  const featuredReviews = reviews.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const activePromo = promos.at(0) ?? null;

  return (
    <main className="flex-1 space-y-20 pb-24">
      <Hero site={siteSettings} />

      <section className="container space-y-10">
        <SectionTitle
          description="Собрали техники, которые сохраняют натуральность и дают стойкий результат. Все процедуры выполняются пигментами премиум-класса."
          eyebrow="Услуги"
          title="Деликатные техники перманента"
          actions={
            <Button asChild variant="outline">
              <Link href="/services">
                Все услуги
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {activePromo ? <PromoBanner promo={activePromo} /> : null}

      <section className="container space-y-10">
        <SectionTitle
          description="Каждая работа создаётся после индивидуального подбора оттенка и формы. Смотрите до/после и вдохновляйтесь идеями для своего образа."
          eyebrow="Портфолио"
          title="Свежие работы студии"
          actions={
            <Button asChild variant="ghost">
              <Link href="/portfolio">
                Смотреть все
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredPortfolio.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="container space-y-10">
        <SectionTitle
          description="Отзывы клиентов, которые выбрали деликатный перманент у PM BY MADI."
          eyebrow="Отзывы"
          title="Голос наших клиентов"
          actions={
            <Button asChild variant="ghost">
              <Link href="/reviews">
                Все отзывы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      <section className="container space-y-10">
        <SectionTitle
          description="Советы по подготовке, уходу и подбору оттенков — коротко и по делу."
          eyebrow="Блог"
          title="Полезные материалы"
          actions={
            <Button asChild variant="ghost">
              <Link href="/blog">
                Читать все
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="container">
        <div className="grid gap-6 overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-10 shadow-soft md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:p-14">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Запись</p>
            <h3 className="font-serif text-3xl text-foreground md:text-4xl">Готовы подчеркнуть естественность?</h3>
            <p className="text-base text-muted-foreground">
              Оставьте заявку или перейдите в мессенджер — обсудим желаемый результат и подберём дату. Мадина на связи, чтобы ответить на вопросы и помочь с подготовкой.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/70 p-6">
            <Link className="text-lg font-semibold text-ink underline-offset-8 hover:underline" href="/contacts">
              Форма записи
            </Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground" href="/faq">
              Частые вопросы
            </Link>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contacts">Записаться</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://instagram.com/pm.by.madi" rel="noreferrer" target="_blank">
                  Instagram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
