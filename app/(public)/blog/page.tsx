import Link from "next/link";
import { Metadata } from "next";
import { getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Блог — PM BY MADI",
  description: "Полезные материалы о подготовке, уходе и техниках перманентного макияжа."
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Блог</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">Советы и экспертные ответы</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Здесь собраны материалы о том, как подготовиться, ухаживать и поддерживать результат перманентного макияжа.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="flex h-full flex-col rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {post.publishedAt ? formatDate(post.publishedAt) : "Скоро"}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-foreground">{post.title}</h2>
            {post.excerpt ? <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p> : null}
            <Button variant="ghost" asChild className="mt-6 justify-start">
              <Link href={`/blog/${post.slug}`}>Читать</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
