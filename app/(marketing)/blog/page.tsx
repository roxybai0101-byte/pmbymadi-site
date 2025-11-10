import Link from "next/link";
import { getPublishedPosts } from "@/lib/queries/public";
import { SectionTitle } from "@/components/site/section-title";
import { PostCard } from "@/components/site/post-card";
import { Button } from "@/components/ui/button";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="flex-1 space-y-20 pb-24">
      <section className="container space-y-6 py-20">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Блог</p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">Советы по перманенту и уходу</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Делимся знаниями о подготовке к процедуре, подборе оттенков и грамотном уходе после перманента. Коротко,
          полезно, по делу.
        </p>
        <Button asChild>
          <Link href="/contacts">Задать вопрос</Link>
        </Button>
      </section>

      <section className="container space-y-10">
        <SectionTitle
          eyebrow="Статьи"
          title="Последние материалы"
          description="Обновляем блог регулярно — заглядывайте, чтобы узнавать о новых техниках и рекомендациях."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
