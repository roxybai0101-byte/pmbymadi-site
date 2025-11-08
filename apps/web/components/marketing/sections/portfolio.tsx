"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button, SectionHeading } from "@pmby/ui";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../../ui/dialog";

interface PortfolioItem {
  id: string;
  imageUrl: string;
  alt: string;
  tag: string;
  title?: string | null;
}

interface PortfolioSectionProps {
  title: string;
  filterAll: string;
  filters: Record<string, string>;
  cta: string;
  items: PortfolioItem[];
  instagramUrl?: string | null;
}

export function PortfolioSection({ title, filterAll, filters, cta, items, instagramUrl }: PortfolioSectionProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = useMemo(
    () => (activeTag ? items.filter((item) => item.tag === activeTag) : items),
    [activeTag, items]
  );

  const tags = Object.entries(filters);

  return (
    <section id="portfolio" className="pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 space-y-4 text-center">
          <SectionHeading accent="Portfolio">{title}</SectionHeading>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeTag === null
                  ? "bg-brand-cocoa text-white shadow-soft"
                  : "bg-brand-powder text-brand-chocolate/80 hover:bg-brand-powder/80"
              }`}
            >
              {filterAll}
            </button>
            {tags.map(([tag, label]) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeTag === tag
                    ? "bg-brand-cocoa text-white shadow-soft"
                    : "bg-brand-powder text-brand-chocolate/80 hover:bg-brand-powder/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag ?? "all"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger className="group relative overflow-hidden rounded-[2rem] shadow-soft">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    width={420}
                    height={560}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <p className="absolute bottom-6 left-6 right-6 text-left text-lg font-serif text-white drop-shadow">
                    {item.title ?? item.alt}
                  </p>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                  <DialogTitle className="sr-only">{item.title ?? item.alt}</DialogTitle>
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    width={1200}
                    height={900}
                    className="h-auto w-full rounded-[2rem]"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
        </AnimatePresence>

        {instagramUrl ? (
          <div className="mt-10 text-center">
            <Button asChild variant="soft">
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                {cta}
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
