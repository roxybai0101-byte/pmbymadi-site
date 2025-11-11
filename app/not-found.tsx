import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-xs uppercase tracking-[0.4em] text-brand-cocoa/60">404</span>
      <h1 className="font-serif text-4xl text-brand-chocolate md:text-5xl">
        Кажется, эта страница ушла на коррекцию
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-brand-cocoa/80">
        Попробуйте вернуться на главную или свяжитесь со мной напрямую — с радостью помогу
        найти нужную информацию.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contacts">Контакты</Link>
        </Button>
      </div>
    </div>
  );
}
