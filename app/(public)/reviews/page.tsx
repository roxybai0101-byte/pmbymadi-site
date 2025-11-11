import { Metadata } from "next";
import { getReviews } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Отзывы — PM BY MADI",
  description: "Отзывы клиентов PM BY MADI о перманентном макияже бровей, губ и век."
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="container py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Отзывы</p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">Клиентский опыт PM BY MADI</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Спасибо за доверие и тёплые слова — делюсь тем, что вы писали после процедур и коррекций.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">{review.name}</h2>
                {review.service ? (
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{review.service.title}</p>
                ) : null}
              </div>
              <span className="text-xs text-muted-foreground">★★★★★</span>
            </div>
            <p className="mt-4 text-sm text-foreground/80">{review.content}</p>
            <div className="mt-4 text-xs text-muted-foreground">{formatDate(review.createdAt)}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
