"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { PortfolioCategory, PortfolioItem } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryLabels: Record<PortfolioCategory, string> = {
  BROWS: "Брови",
  LIPS: "Губы",
  LASHLINE: "Веки",
  REMOVAL: "Удаление"
};

type PortfolioGalleryProps = {
  items: PortfolioItem[];
};

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "ALL">("ALL");

  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") {
      return items;
    }
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const categories = Object.entries(categoryLabels);

  return (
    <section className="section-padding bg-brand-powder/50">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">
              Портфолио
            </span>
            <h2 className="font-serif text-3xl text-brand-chocolate md:text-4xl">
              Галерея работ PM BY MADI
            </h2>
            <p className="text-sm leading-relaxed text-brand-cocoa/80">
              Выберите категорию, чтобы посмотреть до/после. Каждая работа выполнена в мягкой
              технике с учётом индивидуальных особенностей.
            </p>
          </div>
          <Tabs
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as PortfolioCategory | "ALL")}
          >
            <TabsList className="flex w-full flex-wrap gap-2 sm:w-auto">
              <TabsTrigger value="ALL">Все</TabsTrigger>
              {categories.map(([value, label]) => (
                <TabsTrigger key={value} value={value}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeCategory}>
          <TabsContent value={activeCategory}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="group relative flex flex-col overflow-hidden rounded-[34px] border border-brand-warm/40 bg-white/90 text-left shadow-soft transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-powder"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="space-y-2 px-6 py-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">
                          {categoryLabels[item.category]}
                        </p>
                        <h3 className="font-serif text-xl text-brand-chocolate">{item.title}</h3>
                        {item.description ? (
                          <p className="text-sm leading-relaxed text-brand-cocoa/80">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-brand-chocolate">{item.title}</DialogTitle>
                      {item.description ? (
                        <DialogDescription>{item.description}</DialogDescription>
                      ) : null}
                    </DialogHeader>
                    <div className="relative mt-4 aspect-[3/2] w-full overflow-hidden rounded-[24px]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
