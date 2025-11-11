import Image from "next/image";
import Button from "./Button";
import site from "@/data/site.json";

const heroStats = [
  { label: "лет опыта", value: "7+" },
  { label: "довольных клиенток", value: "1200+" },
  { label: "сертификаций", value: "15" }
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-hero-gradient pb-20 pt-28 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-sand-200/60 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-sand-400/40 blur-[160px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[minmax(0,1fr)_400px] md:px-8">
        <div className="flex flex-col gap-6">
          <span className="badge w-fit bg-white/70">{site.brand}</span>
          <h1 id="hero-heading" className="font-serif text-4xl leading-snug text-ink md:text-6xl">
            Премиальный перманентный макияж: губы, брови, веки
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            Создаю безупречный перманентный макияж в эстетике soft glam. Тонкая работа без резких переходов, с
            индивидуальным подбором формы, оттенка и плотности. Только стерильные протоколы и сертифицированные пигменты.
          </p>
          <div className="flex flex-col gap-4 text-sm text-ink/60 md:flex-row md:items-center md:gap-6">
            <Button href="#booking" variant="primary" size="lg">
              {site.ctaText}
            </Button>
            <Button href={site.whatsapp} variant="ghost" size="md">
              Написать в WhatsApp
            </Button>
          </div>
          <div className="flex gap-8 pt-6">
            {heroStats.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-3xl font-semibold text-ink md:text-4xl">{item.value}</span>
                <span className="text-xs uppercase tracking-[0.32em] text-ink/50">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden h-full w-full md:block">
          <div className="gradient-border relative overflow-hidden rounded-[36px]">
            <Image
              src="/portfolio-01.JPG"
              alt="Результат перманентного макияжа бровей от PM BY MADI"
              width={640}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex flex-col gap-2 text-white">
              <span className="uppercase tracking-[0.4em] text-xs text-white/60">PM BY MADI</span>
              <p className="max-w-sm text-sm leading-relaxed text-white/90">
                Нежные пудровые брови, созданные в технике пиксельной растушёвки. Каждая деталь адаптирована под черты лица
                клиентки.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
