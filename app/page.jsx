 "use client";

import site from "../data/site.json";
import services from "../data/services.json";
import gallery from "../data/gallery.json";

function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="container py-16 md:py-24">
      {eyebrow && <span className="text-xs uppercase tracking-[0.3em] text-ink/40">{eyebrow}</span>}
      {title && <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink">{title}</h2>}
      {description && <p className="text-base leading-relaxed text-ink/70 mt-2">{description}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Card({ title, description, price }) {
  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/70 p-4 shadow-soft backdrop-blur">
      <div className="aspect-[4/3] w-full rounded-[20px] bg-gradient-to-br from-sand-100 via-sand-200 to-sand-300 grid place-items-center">
        <span className="text-xs uppercase tracking-[0.3em] text-ink/40">DO / POSLE</span>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-semibold text-ink">{title}</h3>
          <span className="text-xs text-ink/50">{price}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{description}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-16">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-ink/40">{site.brand}</span>
            <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl mt-2">{site.tagline}</h1>
            <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg mt-3">{site.subtitle}</p>
            <div className="flex gap-3 mt-6">
              <a href={site.ctaPrimary.href} className="inline-flex items-center justify-center rounded-xl bg-ink px-4 py-3 text-white">
                {site.ctaPrimary.label}
              </a>
              <a href={site.ctaSecondary.href} className="inline-flex items-center justify-center rounded-xl border border-ink/20 px-4 py-3 text-ink">
                {site.ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <Section
        id="services"
        eyebrow="Услуги"
        title="Подчёркиваем природную эстетику"
        description="Каждая процедура начинается с индивидуальной диагностики и подбором оттенка под вашу кожу."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <Card key={s.title} title={s.title} description={s.description} price={s.price} />
          ))}
        </div>
      </Section>

      {/* Галерея */}
      <Section
        id="gallery"
        eyebrow="Портфолио"
        title="До / После"
        description="Серия образов с лёгким перманентом. Линии, оттенки и пиксели — всё подчинено гармонии и комфорту."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {gallery.map((src, index) => (
            <div key={src} className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/70 p-4 shadow-soft">
              <div className="relative h-64 w-full overflow-hidden rounded-[26px]">
                <img
                  src={src}
                  alt={Работа ${index + 1}}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-lg uppercase tracking-[0.6em] text-ink/20">Before / After</span>
              </div>
              <div className="absolute inset-6 rounded-[24px] border border-white/70 pointer-events-none" />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="pb-24 md:pb-32" align="center">
        <div className="container">
          <h3 className="text-xl md:text-2xl font-semibold">Запись откроется в ближайшее время. Станьте первой в списке.</h3>
          <p className="text-ink/70 mt-2">Оставьте заявку в Telegram — мы вернёмся с датами, подготовкой и мини-гидом по уходу.</p>
          <a href="https://t.me/pm_by_madi" className="inline-block mt-6 rounded-xl bg-ink px-5 py-3 text-white">
            Telegram
          </a>
        </div>
      </section>
    </div>
  );
}
