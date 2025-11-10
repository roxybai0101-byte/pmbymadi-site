import { getPageBySlug } from "@/lib/queries/public";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FaqPage() {
  const page = await getPageBySlug("faq");
  const items =
    typeof page?.content === "object" && page.content && "items" in page.content
      ? (page.content.items as Array<{ question: string; answer: string }>)
      : [];

  return (
    <main className="flex-1 space-y-16 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">FAQ</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{page?.title ?? "FAQ"}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Собрали ответы на самые популярные вопросы про перманентный макияж, подготовку и уход. Если не нашли нужный — напишите, с радостью расскажем подробнее.
        </p>
        <Button asChild>
          <Link href="/contacts">Задать вопрос</Link>
        </Button>
      </section>

      <section className="container">
        <Accordion className="space-y-2" type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} className="rounded-2xl border border-border/60 bg-card/60 px-6" value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
