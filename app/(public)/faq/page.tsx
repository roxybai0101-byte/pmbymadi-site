import { Metadata } from "next";
import { getFaqItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ — PM BY MADI",
  description: "Ответы на популярные вопросы о перманентном макияже и уходе."
};

export default async function FaqPage() {
  const faqs = await getFaqItems();

  return (
    <div className="container py-20 md:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">FAQ</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">Частые вопросы</h1>
        <p className="mt-3 text-sm text-muted-foreground">Если не нашли нужный ответ — напишите, с радостью подскажу.</p>
      </div>

      <div className="mt-12 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground">{faq.question}</h2>
            <p className="mt-3 text-sm text-foreground/80">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
