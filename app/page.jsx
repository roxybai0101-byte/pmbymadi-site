import Button from "../components/Button";
import Card from "../components/Card";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Section from "../components/Section";
import prices from "@/data/prices.json";
import gallery from "@/data/gallery.json";
import links from "@/data/links.json";

mport Image from "next/image";
import services from "@/data/services.json";

export default function HomePage() {
  const galleryPlaceholders = [
    "portfolio-01.JPG",
    "portfolio-02.JPG",
    "portfolio-03.JPG",
    "portfolio-04.JPG",
    "portfolio-05.JPG",
    "portfolio-06.JPG",
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-16 px-5 pb-28 pt-16">
        
        {/* Блок — Услуги */}
        <div className="flex flex-col gap-8 animate-fade-up">
          <h2 className="text-3xl font-bold">Услуги</h2>

          <div className="space-y-4">
            {services.map((item, index) => (
              <div
                key={index}
                className="flex justify-between p-4 rounded-xl border bg-white/60 backdrop-blur shadow-sm"
              >
                <span className="font-semibold">{item.title}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Почему выбирают меня?</h2>
        </div>

        {/* Блок — Галерея (До/После) */}
        <section id="gallery" className="space-y-8">
          <h2 className="text-3xl font-bold">До / После</h2>

          <div className="grid gap-5 md:grid-cols-3">
            {galleryPlaceholders.map((item, index) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/60 p-4 shadow-soft transition hover:shadow-lg"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-[26px]">
                  <img
                    src={/${item}}
                    alt={Работа ${index + 1}}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-lg uppercase tracking-[0.6em] text-ink/20">
                    Before / After
                  </span>
                </div>

                <div className="absolute inset-6 rounded-[24px] border border-white/70 pointer-events-none" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
