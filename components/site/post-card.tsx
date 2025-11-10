import Link from "next/link";
import Image from "next/image";
import type { Post, Media } from "@prisma/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type PostWithMedia = Post & { coverImage: Media | null };

type PostCardProps = {
  post: PostWithMedia;
};

export function PostCard({ post }: PostCardProps) {
  const date = post.publishedAt ? format(post.publishedAt, "d MMMM yyyy", { locale: ru }) : null;

  return (
    <Card className="h-full border-border/60 bg-card/80">
      {post.coverImage ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            alt={post.title}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            src={post.coverImage.url}
          />
        </div>
      ) : null}
      <CardHeader>
        {date ? <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{date}</p> : null}
        <CardTitle className="text-xl">{post.title}</CardTitle>
        {post.excerpt ? <CardDescription>{post.excerpt}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <Link className="text-sm font-medium underline-offset-8 hover:underline" href={`/blog/${post.slug}`}>
          Читать статью
        </Link>
      </CardContent>
    </Card>
  );
}
