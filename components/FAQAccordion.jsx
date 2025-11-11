'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FAQAccordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleIndex = (index) => () =>
    setActiveIndex((current) => (current === index ? -1 : index));

  return (
    <div className="flex flex-col divide-y divide-white/60 rounded-[28px] border border-white/70 bg-white/80 shadow-soft">
      {items.map((item, index) => {
        const isOpen = index === activeIndex;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={toggleIndex(index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-base font-medium text-ink/80 md:px-8 md:py-6"
              aria-expanded={isOpen}
            >
              <span className="text-lg leading-relaxed md:text-xl">{item.q}</span>
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-sand-200/80 text-sand-700 transition-transform duration-300",
                  isOpen ? "rotate-45" : ""
                )}
                aria-hidden="true"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="px-6 pb-6 text-base leading-relaxed text-ink/70 md:px-8">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
