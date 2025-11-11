import type { Review } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type ReviewWithService = Review & {
  service?: { title: string; slug: string } | null;
};

interface ReviewsSectionProps {
  reviews: ReviewWithService[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews.length) return null;

  return (
    <section className="container py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Отзывы</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Гости студии о PM BY MADI</h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Все отзывы — с последующих встреч и переписок. Люблю быть с вами на связи после процедуры.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {reviews.slice(0, 6).map((review) => (
          <Card key={review.id} className="h-full rounded-3xl border border-border/60 bg-white/90 shadow-soft">
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-sand-200/80" />
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {review.service ? review.service.title : "Клиент PM BY MADI"}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">{review.content}</p>
              <div className="mt-auto text-xs text-muted-foreground">
                {formatDate(review.createdAt)} · ★★★★★
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
