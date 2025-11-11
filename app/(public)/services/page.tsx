import Link from "next/link";
import { getServiceCategories } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги — PM BY MADI",
  description:
    "Пудровые брови, перманент губ и век в мягких техниках. Индивидуальная колористика и премиальные пигменты."
};

export default async function ServicesPage() {
  const categories = await getServiceCategories();

  return (
    <div className="container py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Услуги</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Перманент для тех, кто любит натуральность</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Мы подбираем технику и оттенок под задачу, чтобы результат выглядел аккуратно и благородно. Ознакомьтесь с направлениями и запишитесь на консультацию.
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {categories.map((category) => (
          <section key={category.id} className="space-y-6 rounded-[42px] border border-border/60 bg-white/90 p-10 shadow-soft">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-3xl text-foreground">{category.name}</h2>
                {category.description ? (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {category.services.map((service) => (
                <article key={service.id} className="flex h-full flex-col rounded-3xl border border-border/50 bg-background/80 p-6 shadow-soft">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                    <Link href={`/services/${service.slug}`} className="text-sm text-primary hover:underline">
                      Подробнее
                    </Link>
                  </div>
                  {service.excerpt ? (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.excerpt}</p>
                  ) : null}
                  <ul className="mt-4 space-y-2 rounded-2xl bg-white/50 p-4 text-sm text-foreground/80">
                    {service.prices.map((price) => (
                      <li key={price.id} className="flex items-center justify-between">
                        <span>{price.title}</span>
                        <span>{formatCurrency(price.amount, "RUB")}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
