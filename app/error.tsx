"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">500</span>
      <h1 className="font-serif text-4xl text-brand-chocolate md:text-5xl">
        Что-то пошло не так
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-brand-cocoa/80">
        Уже работаю над тем, чтобы всё исправить. Попробуйте обновить страницу или
        вернитесь позже.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Обновить страницу</Button>
        <Button asChild variant="outline">
          <Link href="/contacts">Написать мастеру</Link>
        </Button>
      </div>
    </div>
  );
}
