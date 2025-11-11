"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

type HeroProps = {
  whatsappLink: string;
};

export function Hero({ whatsappLink }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-powder via-brand-white to-brand-warm/40" />
      <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] translate-x-1/3 translate-y-1/3 rounded-full bg-brand-cocoa/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 lg:flex-row lg:items-center">
        <motion.div
          className="max-w-2xl space-y-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-cocoa/50">
            PM BY MADI
          </span>
          <h1 className="font-serif text-4xl leading-tight text-brand-chocolate md:text-5xl lg:text-[58px] lg:leading-[1.1]">
            Премиальный перманентный макияж: брови, губы, веки
          </h1>
          <p className="text-lg leading-relaxed text-brand-cocoa/80 md:text-xl">
            Гиперточная эстетика, стерильность и стойкий результат. Мягкие техники,
            персональный подбор оттенка и сопровождение на каждом этапе.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Записаться в WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">Портфолио</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-brand-cocoa/70">
            <div>
              <p className="font-semibold text-brand-chocolate">Мягкие пиксельные техники</p>
              <p>натуральный эффект</p>
            </div>
            <div>
              <p className="font-semibold text-brand-chocolate">Стерильный протокол</p>
              <p>одноразовые расходники</p>
            </div>
            <div>
              <p className="font-semibold text-brand-chocolate">Поддержка после процедуры</p>
              <p>памятка и сопровождение</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] border border-brand-gold/20 bg-brand-white shadow-ambient">
            <Image
              src="/og-default.png"
              alt="Работа PM BY MADI"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-4 rounded-[34px] border border-white/70" />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/80 p-4 text-sm text-brand-cocoa/80 backdrop-blur">
              «Комфорт процедуры — мой приоритет: всё максимально деликатно и без лишней
              травматизации»
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
