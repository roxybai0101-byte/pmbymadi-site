import faq from "@/data/faq.json";
import Section from "./Section";
import FAQAccordion from "./FAQAccordion";

export default function FAQSection() {
  return (
    <Section
      id="faq"
      eyebrow="Вопросы и ответы"
      title="Подробно рассказываю о процессе и уходе"
      description="Собрала частые вопросы про перманентный макияж, заживление, коррекции и уход. Если остались сомнения — напишите, всё объясню."
    >
      <FAQAccordion items={faq} />
    </Section>
  );
}
