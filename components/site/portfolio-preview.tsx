import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem, Media } from "@prisma/client";
import { Button } from "@/components/ui/button";

type PortfolioWithMedia = (PortfolioItem & { image: Media | null; service?: { title: string; slug: string } | null });

interface PortfolioPreviewProps {
  items: PortfolioWithMedia[];
}

export function PortfolioPreview({ items }: PortfolioPreviewProps) {
  if (!items.length) return null;

  return (
    <section className="container py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Портфолио</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Натуральные результаты</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            До/после процедур, чтобы вы увидели, как бережно мы работаем с формой и оттенком.
          </p>
        </div>
        <Button variant="outline" asChild className="w-full rounded-xl md:w-auto">
          <Link href="/portfolio">Весь кейсбук</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.slice(0, 6).map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-[32px] border border-border/60 bg-white shadow-soft">
            {item.image ? (
              <Image
                src={item.image.url}
                alt={item.image.alt ?? item.title}
                width={800}
                height={600}
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-muted text-muted-foreground">Изображение скоро появится</div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              ) : null}
              {item.service ? (
                <Link href={`/services/${item.service.slug}`} className="mt-3 inline-flex text-sm text-primary hover:underline">
                  {item.service.title}
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
