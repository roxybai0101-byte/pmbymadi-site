import Link from "next/link";
import type { Post, Media } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PostWithCover = Post & { cover: Media | null };

interface BlogPreviewProps {
  posts: PostWithCover[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts.length) return null;

  return (
    <section className="container py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Блог</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Советы по уходу и подготовке</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Делимся опытом и отвечаем на популярные вопросы о перманентном макияже.
          </p>
        </div>
        <Button variant="ghost" asChild className="w-full md:w-auto">
          <Link href="/blog">Читать все статьи</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Card key={post.id} className="h-full rounded-3xl border border-border/60 bg-white/90 shadow-soft">
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {post.publishedAt ? formatDate(post.publishedAt) : "Скоро"}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
              {post.excerpt ? <p className="text-sm text-muted-foreground">{post.excerpt}</p> : null}
              <Button variant="ghost" asChild className="mt-auto">
                <Link href={`/blog/${post.slug}`}>Читать</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
