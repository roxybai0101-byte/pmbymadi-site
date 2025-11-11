import type { Faq } from "@prisma/client";

import { SectionHeader } from "@/components/marketing/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FAQSectionProps = {
  faqs: Faq[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="section-padding">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Ответы на частые вопросы"
          description="Если у вас остались вопросы — напишите в WhatsApp, и я подскажу, как подготовиться и чего ждать на каждом этапе."
          align="center"
        />
        <Accordion type="single" collapsible className="rounded-[30px] border border-brand-warm/40 bg-white/90 p-4 shadow-soft">
          {faqs.map((faq) => (
            <AccordionItem value={faq.id} key={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
