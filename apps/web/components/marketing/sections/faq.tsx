import { SectionDescription, SectionHeading } from "@pmby/ui";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export function FaqSection({ title, subtitle, items }: FaqSectionProps) {
  return (
    <section id="faq" className="pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10 text-center">
          <SectionHeading accent="FAQ">{title}</SectionHeading>
          <SectionDescription className="mt-4 text-brand-cocoa/80">{subtitle}</SectionDescription>
        </div>
        <Accordion type="single" collapsible className="rounded-[2rem] bg-white/90 p-4 shadow-soft">
          {items.map((item, index) => (
            <AccordionItem key={item.id} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
