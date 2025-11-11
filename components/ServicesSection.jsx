import services from "@/data/services.json";
import Section from "./Section";

export default function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="Услуги"
      title="Перманентный макияж с индивидуальной архитектурой"
      description="Работаю с каждым элементом образа: от анализа формы лица до подбора пигмента под ваш подтон кожи. Разрабатываю мягкие градиенты, которые со временем выглядят только лучше."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service, index) => (
          <article
            key={service.id}
            className="glass-card relative flex flex-col gap-5 rounded-[32px] border-white/70 bg-white/80 p-8 shadow-soft"
            style={{ animationDelay: `${0.1 * index + 0.1}s` }}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <span className="rounded-full border border-sand-200/80 bg-sand-100/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.32em] text-sand-700">
                  {service.price}
                </span>
              </div>
              <p className="text-sm uppercase tracking-[0.32em] text-ink/40">{service.subtitle}</p>
            </div>
            <p className="text-base leading-relaxed text-ink/70">{service.description}</p>
            <div className="flex items-center justify-between text-sm text-ink/50">
              <span>Длительность: {service.duration}</span>
              <span className="text-ink/40">Запись через WhatsApp</span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
