import Image from "next/image";
import PriceList from "@/components/PriseList";
import "@/globals.css";

// Список изображений галереи из папки /public
const galleryPlaceholders = [
  "portfolio-01.JPG",
  "portfolio-02.JPG",
  "portfolio-03.JPG",
  "portfolio-04.JPG",
  "portfolio-05.JPG",
  "portfolio-06.JPG",
];

export default function HomePage() {
  return (
    <div className="bg-ivory text-ink">
      {/* ✅ Главный баннер */}
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">PM BY MADI</h1>
        <p className="text-xl opacity-80">
          Современный перманентный макияж • Пудровые брови • Губы • Межресничка
        </p>
      </section>

      {/* ✅ ГАЛЕРЕЯ "ДО / ПОСЛЕ" */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold mb-10">До / После</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {galleryPlaceholders.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[26px] border border-white/50 bg-white/10 shadow-soft"
            >
              <Image
                src={/${item}}
                alt={Работа ${index + 1}}
                width={600}
                height={500}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />

              {/* затемнение */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20" />

              {/* подпись "Before / After" */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg uppercase tracking-[0.6em] text-ink/40 pointer-events-none">
                  Before / After
                </span>
              </div>

              {/* рамка */}
              <div className="absolute inset-3 rounded-[24px] border border-white/70 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* ✅ БЛОК ЦЕН — работает, без ошибок */}
      <PriceList />

      {/* ✅ Call-to-Action */}
      <section className="container py-24 text-center">
        <h3 className="text-3xl font-bold mb-3">Запись открыта</h3>
        <p className="opacity-80 mb-6">
          Оставьте заявку в Telegram — мы ответим и предложим ближайшие даты.
        </p>

        <a
          href="https://t.me/pm_by_madi"
          className="inline-block bg-ink text-ivory px-8 py-4 rounded-2xl shadow-soft hover:opacity-90 transition"
        >
          Перейти в Telegram
        </a>
      </section>
    </div>
  );
}
