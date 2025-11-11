export function AboutSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-[40px] border border-brand-warm/40 bg-white/80 p-10 shadow-soft backdrop-blur md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">
            О мастере
          </span>
          <h2 className="font-serif text-3xl text-brand-chocolate md:text-4xl">
            Привет! Я Мадина, мастер перманентного макияжа.
          </h2>
          <p className="text-base leading-relaxed text-brand-cocoa/80">
            Работаю в мягких техниках, аккуратно подчеркиваю естественную красоту и соблюдаю
            полный протокол стерильности. Использую сертифицированные пигменты и
            индивидуально подбираю форму и оттенок под ваш цветотип. Комфорт процедуры —
            мой приоритет: всё максимально деликатно и без лишней травматизации.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-brand-gold/20 bg-brand-powder/60 p-8 text-sm text-brand-cocoa/80">
          <div>
            <p className="font-semibold text-brand-chocolate">Геометрия лица</p>
            <p>Строю эскиз с учётом костной базы и мимики, чтобы результат выглядел естественно.</p>
          </div>
          <div>
            <p className="font-semibold text-brand-chocolate">Комфорт клиента</p>
            <p>Анестетики последнего поколения, деликатное нанесение и сопровождение после процедуры.</p>
          </div>
          <div>
            <p className="font-semibold text-brand-chocolate">Ответственный подход</p>
            <p>Перед стартом обсуждаем пожелания, противопоказания и подбираем уход на восстановление.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
