import features from "@/data/features.json";
import Section from "./Section";

export default function AdvantagesSection() {
  return (
    <Section
      id="advantages"
      eyebrow="Почему выбирают PM BY MADI"
      title="Премиальный сервис и безупречная стерильность"
      description="На каждом этапе — от консультации до постухода — вы окружены заботой. Я сопровождаю вас, объясняю все нюансы и даю реалистичные ожидания по заживлению."
      className="bg-ivory"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="glass-card relative flex flex-col gap-4 rounded-[28px] border-white/70 bg-white/80 p-8"
          >
            <span className="text-xs uppercase tracking-[0.36em] text-sand-700">{feature.title}</span>
            <p className="text-base leading-relaxed text-ink/70">{feature.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
