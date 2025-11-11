import Image from "next/image";
import Section from "./Section";

const highlights = [
  "Международные курсы и повышение квалификации ежегодно",
  "Работаю с анатомией лица, а не по шаблонам",
  "Сопровождаю до полного заживления и даю рекомендации по уходу"
];

export default function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="О мастере"
      title="Меня зовут Мади — мастер перманентного макияжа и эстетист"
      description="Каждое лицо — отдельный проект. Перед стартом процедуры я провожу детальный анализ анатомии, оттенка кожи и ваших привычек, чтобы создать перманентный макияж, который подчеркнёт природную красоту и впишется в ритм жизни."
      className="bg-white/80 backdrop-blur-xl"
    >
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="flex flex-col gap-6">
          <p className="text-base leading-relaxed text-ink/70">
            Строю мягкие формы и воздушные градиенты. Работаю в эстетике soft glam: никакой плотной заливки, только
            аккуратные пиксели, адаптированные под вас. В студии действуют строгие протоколы стерильности: одноразовые
            расходники, многоступенчатая дезинфекция и индивидуальные карты клиентов.
          </p>
          <ul className="grid gap-4 text-sm leading-relaxed text-ink/80">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-sand-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="gradient-border relative overflow-hidden rounded-[36px]">
            <Image
              src="/portfolio-02.JPG"
              alt="Мастер PM BY MADI за работой над перманентным макияжем"
              width={720}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent p-6 text-xs uppercase tracking-[0.28em] text-white/80">
              Мастер PM BY MADI
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
