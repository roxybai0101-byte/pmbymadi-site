"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StarIcon } from "lucide-react";

import { Button, Card, CardContent, SectionDescription, SectionHeading } from "@pmby/ui";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  title: string;
  subtitle: string;
  ratingLabel: string;
  reviews: Review[];
}

export function ReviewsSection({ title, subtitle, ratingLabel, reviews }: ReviewsSectionProps) {
  const [index, setIndex] = useState(0);
  const slides = useMemo(() => {
    const chunkSize = 2;
    const copy = [...reviews];
    const chunks: Review[][] = [];
    while (copy.length) {
      chunks.push(copy.splice(0, chunkSize));
    }
    return chunks;
  }, [reviews]);

  if (slides.length === 0) {
    return null;
  }

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="reviews" className="pb-20 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <SectionHeading accent="Trust">{title}</SectionHeading>
          <SectionDescription className="mx-auto mt-4 max-w-2xl">{subtitle}</SectionDescription>
        </div>

        <div className="relative overflow-hidden rounded-[3rem] bg-white/80 p-10 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 lg:grid-cols-2"
            >
              {slides[index]?.map((review) => (
                <Card key={review.id} className="bg-brand-powder/30">
                  <CardContent className="space-y-4 p-8">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <StarIcon
                          key={idx}
                          className={`h-4 w-4 ${
                            idx < review.rating ? "text-brand-gold" : "text-brand-cocoa/30"
                          }`}
                          fill={idx < review.rating ? "#C8A96A" : "transparent"}
                        />
                      ))}
                      <span className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/70">
                        {ratingLabel}
                      </span>
                    </div>
                    <p className="text-base text-brand-chocolate/90">{review.text}</p>
                    <p className="text-sm font-semibold text-brand-chocolate">{review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  className={`h-2 w-8 rounded-full transition ${
                    slideIndex === index ? "bg-brand-cocoa" : "bg-brand-cocoa/30"
                  }`}
                >
                  <span className="sr-only">Go to slide {slideIndex + 1}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={prev}>
                ←
              </Button>
              <Button variant="outline" size="sm" onClick={next}>
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
