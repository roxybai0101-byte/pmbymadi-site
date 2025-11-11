import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/data";

export const metadata: Metadata = {
  title: "О мастере — PM BY MADI",
  description: "Мадина — мастер перманентного макияжа. Индивидуальный подход, деликатные техники и премиальные пигменты."
};

export default async function MasterPage() {
  const page = await getPageBySlug("master");
  if (!page) notFound();

  return (
    <article className="container py-20 md:py-24">
      <div className="max-w-3xl space-y-6">
        <p className="eyebrow">О мастере</p>
        <h1 className="font-serif text-4xl md:text-5xl">{page.title}</h1>
        <div className="prose prose-neutral max-w-none prose-h2:font-serif prose-h2:text-2xl">
          {page.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
