import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getPostBySlug } from "@/lib/queries/public";
import { Button } from "@/components/ui/button";

type PostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Материал не найден — PM BY MADI"
    };
  }

  return {
    title: `${post.title} — PM BY MADI`,
    description: post.excerpt ?? "Советы по перманентному макияжу от студии PM BY MADI."
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const publishedAt = post.publishedAt ? format(post.publishedAt, "d MMMM yyyy", { locale: ru }) : null;
  const paragraphs = post.content?.split(/\n{2,}/).filter(Boolean) ?? [];

  return (
    <main className="flex-1 space-y-16 pb-24">
      <article className="container space-y-8 py-20">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Блог</p>
          <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">{post.title}</h1>
          {post.excerpt ? <p className="max-w-2xl text-lg text-muted-foreground">{post.excerpt}</p> : null}
          {publishedAt ? <p className="text-sm text-muted-foreground">Опубликовано {publishedAt}</p> : null}
        </div>
        {post.coverImage ? (
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-border/60">
            <Image
              alt={post.title}
              className="object-cover"
              fill
              priority={false}
              sizes="(min-width: 1024px) 70vw, 100vw"
              src={post.coverImage.url}
            />
          </div>
        ) : null}
        <div className="prose prose-neutral max-w-none text-base leading-relaxed text-foreground">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="container rounded-3xl border border-border/60 bg-card/70 p-10 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Хотите такой же результат?</p>
            <h2 className="font-serif text-3xl text-foreground md:text-4xl">Обсудим вашу процедуру</h2>
            <p className="text-base text-muted-foreground">
              Расскажите о задаче и любимом макияже — Мадина предложит подходящую технику и оттенок, объяснит нюансы
              подготовки и ухода.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Button asChild>
              <Link href="/contacts">Записаться</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://wa.me/77017774545" rel="noreferrer" target="_blank">
                WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://instagram.com/pm.by.madi" rel="noreferrer" target="_blank">
                Instagram
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
