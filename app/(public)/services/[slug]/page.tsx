import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ServicePageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — PM BY MADI`,
    description: service.excerpt ?? undefined
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)] md:items-start">
        <div className="space-y-8">
          <div>
            <p className="eyebrow">{service.category?.name}</p>
            <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">{service.title}</h1>
            {service.excerpt ? (
              <p className="mt-3 text-sm text-muted-foreground">{service.excerpt}</p>
            ) : null}
          </div>

          {service.description ? (
            <div className="prose prose-neutral max-w-none prose-h2:font-serif prose-h2:text-2xl">
              {service.description.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard title="Подготовка">{service.preparation}</InfoCard>
            <InfoCard title="Противопоказания">{service.contraindications}</InfoCard>
            <InfoCard title="Уход">{service.aftercare}</InfoCard>
          </div>

          {service.portfolioItems.length ? (
            <section>
              <h2 className="font-serif text-2xl">Работы</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {service.portfolioItems.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-3xl border border-border/40 bg-white shadow-soft">
                    {item.image ? (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt ?? item.title}
                        width={640}
                        height={480}
                        className="h-48 w-full object-cover"
                      />
                    ) : null}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      {item.description ? <p className="mt-2 text-xs text-muted-foreground">{item.description}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {service.reviews.length ? (
            <section>
              <h2 className="font-serif text-2xl">Отзывы о процедуре</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {service.reviews.slice(0, 4).map((review) => (
                  <div key={review.id} className="rounded-3xl border border-border/50 bg-white p-5 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{review.name}</span>
                      <span className="text-xs text-muted-foreground">★★★★★</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.content}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt={service.title}
              width={600}
              height={400}
              className="w-full rounded-3xl object-cover"
            />
          ) : null}
          <div>
            <h2 className="font-serif text-2xl text-foreground">Стоимость</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              {service.prices.map((price) => (
                <li key={price.id} className="flex items-center justify-between">
                  <span>{price.title}</span>
                  <span>{formatCurrency(price.amount, "RUB")}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button asChild className="w-full rounded-xl">
            <Link href={`/contacts?service=${service.slug}#booking`}>Записаться</Link>
          </Button>
          {service.spotlightText ? (
            <p className="text-xs text-muted-foreground">* {service.spotlightText}</p>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children?: string | null }) {
  if (!children) return null;
  return (
    <div className="rounded-3xl border border-border/40 bg-white/70 p-6 shadow-soft">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}
