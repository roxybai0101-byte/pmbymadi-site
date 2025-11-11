import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getPostBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — PM BY MADI`,
    description: post.excerpt ?? undefined
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = parseContent(post.content);

  return (
    <article className="container py-16 md:py-20">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {post.publishedAt ? formatDate(post.publishedAt) : "Скоро"}
        </div>
        <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">{post.title}</h1>
        {post.excerpt ? <p className="mt-4 text-sm text-muted-foreground">{post.excerpt}</p> : null}

        <div className="prose prose-neutral mt-8 max-w-none prose-h2:font-serif prose-h2:text-2xl prose-strong:text-foreground">
          {blocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="mt-8">
                  {block.content}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={index} className="mt-4 list-disc pl-6">
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="mt-4">
                {block.content}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}

type ContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "list"; items: string[] };

function parseContent(content: string): ContentBlock[] {
  const lines = content.split("\n");
  const blocks: ContentBlock[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: "list", items: listBuffer });
      listBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "heading", content: line.replace(/^##\s*/, "") });
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      listBuffer.push(line.replace(/^(-|•)\s*/, ""));
    } else {
      flushList();
      blocks.push({ type: "paragraph", content: line });
    }
  }

  flushList();
  return blocks;
}
