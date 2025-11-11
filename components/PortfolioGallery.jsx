'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Button from "./Button";

const INITIAL_ITEMS = 4;
const STEP = 2;

export default function PortfolioGallery({ items }) {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);

  const visibleList = useMemo(() => items.slice(0, visibleItems), [items, visibleItems]);
  const canLoadMore = visibleItems < items.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + STEP, items.length));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleList.map((item) => (
          <figure
            key={item.file}
            className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/60 shadow-soft"
          >
            <Image
              src={`/${item.file}`}
              alt={item.title}
              width={520}
              height={640}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent px-5 py-6 text-white">
              <span className="text-xs uppercase tracking-[0.32em] text-white/70">{item.tag}</span>
              <p className="text-sm leading-relaxed text-white/90">{item.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      {canLoadMore && (
        <div className="flex justify-center">
          <Button variant="secondary" size="md" onClick={handleLoadMore}>
            Показать ещё
          </Button>
        </div>
      )}
    </div>
  );
}
