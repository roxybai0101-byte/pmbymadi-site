import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem, Media, Service } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type PortfolioWithRelations = PortfolioItem & {
  coverImage: Media | null;
  service: Service | null;
};

type PortfolioCardProps = {
  item: PortfolioWithRelations;
};

export function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <Card className="group h-full overflow-hidden border-border/50 bg-card/80">
      <div className="relative h-64 overflow-hidden">
        {item.coverImage ? (
          <Image
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            fill
            priority={false}
            sizes="(min-width: 1024px) 25vw, 100vw"
            src={item.coverImage.url}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
            Фото скоро появится
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          {item.service ? <Badge variant="subtle">{item.service.title}</Badge> : null}
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl">{item.title}</CardTitle>
        {item.description ? <CardDescription>{item.description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <Link className="text-sm font-medium underline-offset-8 hover:underline" href="/portfolio">
          Больше работ
        </Link>
      </CardContent>
    </Card>
  );
}
