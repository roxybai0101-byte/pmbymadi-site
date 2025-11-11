import { Metadata } from "next";
import { getPromos } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Акции — PM BY MADI",
  description: "Актуальные спецпредложения студии PM BY MADI."
};

export default async function PromosPage() {
  const promos = await getPromos();

  return (
    <div className="container py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Акции</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">Поддержка красоты со специальными условиями</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Следите за актуальными предложениями — они помогают вовремя пройти коррекцию и протестировать новые техники.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {promos.map((promo) => (
          <article
            key={promo.id}
            className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft transition hover:shadow-glow"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
              <span className={promo.isActive ? "text-primary" : "text-muted-foreground"}>
                {promo.isActive ? "Действует" : "Завершено"}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-2xl text-foreground">{promo.title}</h2>
            {promo.description ? (
              <p className="mt-3 text-sm text-muted-foreground">{promo.description}</p>
            ) : null}
            {promo.details ? <p className="mt-3 text-xs text-muted-foreground">{promo.details}</p> : null}
            {promo.isActive ? (
              <Button asChild className="mt-6 rounded-xl">
                <Link href="/contacts#booking">Записаться</Link>
              </Button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
