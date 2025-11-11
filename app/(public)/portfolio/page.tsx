import Image from "next/image";
import { Metadata } from "next";
import { getPortfolio } from "@/lib/data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Портфолио — PM BY MADI",
  description: "Реальные работы PM BY MADI: пудровые брови, перманент губ и век в деликатных техниках."
};

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <div className="container py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Портфолио</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">До и после — как выглядит деликатный перманент</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Каждая работа — результат индивидуальной консультации и тонкой настройки оттенка. Сохраняем естественность и лёгкость в любой технике.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[34px] border border-border/60 bg-white shadow-soft">
            {item.image ? (
              <Image
                src={item.image.url}
                alt={item.image.alt ?? item.title}
                width={960}
                height={720}
                className="h-64 w-full object-cover"
              />
            ) : null}
            <div className="p-6 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
              {item.description ? <p className="text-sm text-muted-foreground">{item.description}</p> : null}
              {item.service ? (
                <Link href={`/services/${item.service.slug}`} className="text-sm text-primary hover:underline">
                  {item.service.title}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
