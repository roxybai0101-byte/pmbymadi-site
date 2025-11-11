import Link from "next/link";
import type { Promo } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  promo: Promo | null;
}

export function PromoBanner({ promo }: PromoBannerProps) {
  if (!promo) return null;

  return (
    <section className="container py-16">
      <div className="rounded-[40px] border border-border/60 bg-primary/10 p-10 shadow-glow backdrop-blur">
        <p className="eyebrow text-primary">Специальное предложение</p>
        <h2 className="mt-4 font-serif text-3xl text-primary">{promo.title}</h2>
        {promo.description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary/80">{promo.description}</p>
        ) : null}
        <div className="mt-6 flex items-center gap-4">
          <Button asChild className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contacts#booking">Записаться со скидкой</Link>
          </Button>
          {promo.details ? <span className="text-xs text-primary/70">{promo.details}</span> : null}
        </div>
      </div>
    </section>
  );
}
