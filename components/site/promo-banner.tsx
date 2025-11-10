import Link from "next/link";
import type { Promo } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type PromoBannerProps = {
  promo: Promo;
};

export function PromoBanner({ promo }: PromoBannerProps) {
  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-ink text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_60%)]" />
        <div className="relative grid gap-8 px-8 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:px-12 md:py-16">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-ivory/70">Акция</p>
            <h3 className="font-serif text-3xl md:text-4xl">{promo.title}</h3>
            {promo.excerpt ? <p className="text-lg text-ivory/80">{promo.excerpt}</p> : null}
          </div>
          <div className="flex flex-col justify-between gap-6">
            {promo.body ? <p className="text-sm text-ivory/70">{promo.body}</p> : null}
            <div>
              <Button asChild className="bg-ivory text-ink hover:bg-ivory/90" variant="secondary">
                <Link href="/contacts">
                  Записаться
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
