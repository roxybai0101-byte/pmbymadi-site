import { getPageBySlug } from "@/lib/queries/public";

export default async function OfferPage() {
  const page = await getPageBySlug("offer");
  const markdown = typeof page?.content === "object" && page.content && "markdown" in page.content ? String(page.content.markdown) : "";
  const paragraphs = markdown.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="flex-1 space-y-12 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Документ</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{page?.title ?? "Публичная оферта"}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          На этой странице представлены условия оказания услуг студии PM BY MADI. Оферта может обновляться, следите за актуальной версией.
        </p>
      </section>
      <section className="container prose prose-neutral max-w-none text-base leading-relaxed text-foreground">
        {paragraphs.length ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>Документ готовится к публикации.</p>}
      </section>
    </main>
  );
}
