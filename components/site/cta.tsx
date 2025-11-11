import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCallToAction() {
  return (
    <section className="container py-24">
      <div className="rounded-[44px] border border-border/60 bg-white/90 p-10 text-center shadow-soft backdrop-blur md:p-16">
        <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
          Готовы к перманенту, который подчеркнёт вас?
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Оставьте контакты — подберём технику, оттенок и расскажем о подготовке. Ответим на все вопросы до записи.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="rounded-xl px-6 py-3">
            <Link href="/contacts#booking">Записаться</Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl px-6 py-3">
            <Link href="/contacts#question">Задать вопрос</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
