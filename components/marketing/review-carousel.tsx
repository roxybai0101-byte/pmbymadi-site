"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import type { Review } from "@prisma/client";

import { Button } from "@/components/ui/button";

type ReviewCarouselProps = {
  reviews: Review[];
};

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, reviews]);

  if (!reviews.length) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">
              Отзывы
            </span>
            <h2 className="font-serif text-3xl text-brand-chocolate md:text-4xl">
              Натурально, аккуратно и без стресса
            </h2>
            <p className="text-sm leading-relaxed text-brand-cocoa/80">
              Каждая клиентка уходит с персональной памяткой и поддержкой на период
              заживления. Спасибо за доверие — ваши отзывы вдохновляют.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Предыдущий отзыв">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Следующий отзыв">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="w-[320px] flex-none rounded-[30px] border border-brand-warm/40 bg-white/90 p-6 shadow-soft"
              >
                <div className="flex items-center gap-2 text-brand-gold">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-cocoa/80">
                  “{review.content}”
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-brand-chocolate">{review.author}</p>
                  {review.serviceName ? (
                    <p className="text-sm text-brand-cocoa/60">{review.serviceName}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
