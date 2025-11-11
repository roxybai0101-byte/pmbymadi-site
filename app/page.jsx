 import services from "../data/services.json";
import gallery from "../data/gallery.json";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-28 md:flex-row md:items-center">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-ink/40">
            PM BY MADI
          </span>
          <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl">
            Современный перманентный макияж
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
            Натуральная эстетика: брови, губы, межресничка — деликатные техники,
            которые усиливают индивидуальные черты.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="https://t.me/pm_by_madi"
              className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Записаться в Telegram
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-xl border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-white/80"
            >
              Смотреть работы
            </a>
          </div>

          {/* 3 фичи под заголовком (по желанию можно править текст прямо тут) */}
          <div className="grid grid-cols-2 gap-5 rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-soft md:grid-cols-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.3em] text-ink/40">Опыт</span>
              <span className="text-2xl font-semibold text-ink">7 лет практики</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.3em] text-ink/40">Подход</span>
              <span className="text-2xl font-semibold text-ink">Только натуральность</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.3em] text-ink/40">Пигменты</span>
              <span className="text-2xl font-semibold text-ink">Проверенные бренды</span>
            </div>
          </div>
        </div>

        {/* Декор справа в hero (пустой блок, можно удалить) */}
        <div className="relative hidden flex-1 items-center justify-center md:flex">
          <div className="relative h-[420px] w-full max-w-[420px] overflow-hidden rounded-[44px] border border-white/70 shadow-soft">
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-sand-200/40" />
            <div className="absolute inset-6 rounded-[24px] border border-white/70" />
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="mx-auto w-full max-w-6xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-ink mb-6">Услуги</h2>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.slug}
              className="rounded-3xl bg-white/80 p-6 border border-white/70 shadow-soft"
            >
              <div className="mb-4 aspect-[4/3] rounded-2xl bg-gradient-to-b from-sand-100 to-sand-200 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-ink/40">
                До / После · PM BY MADI
              </div>

              <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{s.description}</p>

              <div className="mt-4 text-right text-sm font-medium text-ink/60">
                от {s.priceFrom} BYN
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ГАЛЕРЕЯ: ДО / ПОСЛЕ */}
      <section id="gallery" className="mx-auto w-full max-w-6xl px-6 pb-12">
        <h2 className="text-2xl font-bold text-ink mb-6">Портфолио · До / После</h2>

        <p className="text-ink/70 mb-6">
          Серия образов с лёгким перманентом. Линии, оттенки и пиксели — всё
          подчинено гармонии и комфорту.
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {gallery.map((src, index) => (
            <div
              key={src}
              className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/60 shadow-soft"
            >
              <img
                src={src}
                alt={Работа ${index + 1}}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-lg uppercase tracking-[0.6em] text-ink/20">
                  Before / After
                </span>
              </div>
              <div className="absolute inset-6 rounded-[24px] border border-white/70 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 md:pb-32" align="center">
        <div className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-soft">
          <h3 className="text-xl md:text-2xl font-semibold text-ink">
            Запись откроется в ближайшее время. Станьте первой в списке.
          </h3>
          <p className="mt-2 text-ink/70">
            Оставьте заявку в Telegram или напишите письмо — мы вернёмся с датами,
            подготовкой и мини-гидом по уходу.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="https://t.me/pm_by_madi"
              className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Telegram
            </a>
            <a
              href="mailto:hello@pm-by-madi.com"
              className="inline-flex items-center justify-center rounded-xl border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-white/80"
            >
              Написать на e-mail
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
