import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SiteSettingValue } from "@/types/content";

const defaultAdvantages = [
  "Эстетика без перегруза",
  "Гипоаллергенные пигменты премиум-класса",
  "Индивидуальная колористика",
  "Поддержка после процедуры"
];

type HeroProps = {
  site: SiteSettingValue;
};

export function Hero({ site }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-ivory/60">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(201,165,129,0.18),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(153,116,84,0.16),_transparent_45%)]" />

      <div className="container grid gap-12 py-24 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:py-32">
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">PM BY MADI</p>
          <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
            {site.tagline ?? "Перманентный макияж, который подчёркивает природную красоту"}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            {site.subheading ??
              "Деликатная техника, идеальные оттенки и бережный уход. Работы выглядят естественно — утром, днём и вечером."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={site.cta?.href ?? "/contacts"}>{site.cta?.label ?? "Записаться"}</Link>
            </Button>
            <Link className="text-sm font-medium text-ink underline-offset-8 hover:underline" href="/portfolio">
              Смотреть работы
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/70 p-8 shadow-soft backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Преимущества</p>
          <ul className="mt-6 space-y-5 text-base text-foreground">
            {defaultAdvantages.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-brand-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
