'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

export default function ReviewCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [items.length]);

  const selectSlide = (index) => () => setActiveIndex(index);

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-soft">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {items.map((review) => (
          <article key={`${review.name}-${review.service}`} className="min-w-full pr-8 md:pr-16">
            <span className="text-xs uppercase tracking-[0.32em] text-sand-600">{review.service}</span>
            <p className="mt-6 text-lg leading-relaxed text-ink/80 md:text-xl">“{review.text}”</p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium uppercase tracking-[0.28em] text-ink/60">{review.name}</span>
                <span className="text-xs text-ink/40">{review.date}</span>
              </div>
              <div className="ml-auto flex items-center gap-1 text-sand-500">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className={cn("h-4 w-4", starIndex < review.rating ? "fill-sand-500" : "fill-sand-200")}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Показать отзыв ${idx + 1}`}
            onClick={selectSlide(idx)}
            className={cn(
              "h-2.5 w-6 rounded-full transition-all",
              idx === activeIndex ? "bg-sand-500" : "bg-sand-200"
            )}
          />
        ))}
      </div>
    </div>
  );
}
