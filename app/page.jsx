 cursor/bc-c9a80a17-88ac-45d8-8d1a-991091e5c79d-7e17
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import BookingSection from "@/components/BookingSection";
import ContactsSection from "@/components/ContactsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <AdvantagesSection />
      <PortfolioSection />
      <ReviewsSection />
      <FAQSection />
      <BookingSection />
      <ContactsSection />
    </>

import Button from "../components/Button";
import Card from "../components/Card";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Section from "../components/Section";
import prices from "@/data/prices.json";
import gallery from "@/data/gallery.json";
import links from "@/data/links.json";
import services from "@/data/services.json";
import features from "@/data/features.json";
import reviews from "@/data/reviews.json";
import faq from "@/data/faq.json";
import site from "@/data/site.json";
import gallery from "@/data/gallery.json";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-20 px-5 pb-28 pt-16">

        {/* ✅ УСЛУГИ */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Услуги</h2>

          <div className="space-y-4">
            {services.map((item, i) => (
              <div
                key={i}
                className="flex justify-between p-4 rounded-xl border bg-white/60 backdrop-blur shadow-sm"
              >
                <span className="font-semibold">{item.title}</span>
                <span className="opacity-80">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ ГАЛЕРЕЯ */}
        <section id="gallery" className="space-y-6">
          <h2 className="text-3xl font-bold">До / После</h2>
          <p className="text-ink/70">
            Натуральный результат: мягкие пиксели, аккуратные оттенки, чистая форма.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {gallery.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/60 p-4 shadow-soft hover:shadow-lg transition"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-[26px]">
                  <img
                    src={/${item.file}}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-lg uppercase tracking-[0.6em] text-ink/20">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute inset-6 rounded-[24px] border border-white/70 pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* ✅ ПОЧЕМУ ВЫБИРАЮТ МЕНЯ */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Почему выбирают меня</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="p-5 rounded-2xl border bg-white/60 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-ink/70">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ ОТЗЫВЫ */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Отзывы</h2>

          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl border bg-white/60 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-ink/10 flex items-center justify-center text-xs">
                    {r.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="font-medium">{r.name}</div>
                </div>

                <p className="text-ink/80">{r.text}</p>

                {r.rating && (
                  <div className="mt-2 text-amber-500" aria-label={Рейтинг ${r.rating} из 5}>
                    {"★★★★★".slice(0, r.rating)}
                    <span className="opacity-30">{"★★★★★".slice(r.rating)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ✅ FAQ */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Частые вопросы</h2>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <details
                key={i}
                className="rounded-2xl border bg-white/60 shadow-sm p-4"
              >
                <summary className="cursor-pointer font-semibold select-none">
                  {item.q}
                </summary>
                <p className="mt-2 text-ink/80">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ✅ CTA */}
        <section className="pb-24 md:pb-32" align="center">
          <div className="inline-flex items-center gap-3 rounded-2xl border bg-white/70 px-5 py-4 shadow-sm animate-fade-up">
            <a
              href={site.telegram || "#"}
              className="px-4 py-2 rounded-xl border bg-ink text-white hover:opacity-90 transition"
            >
              {site.ctaText || "Записаться"}
            </a>

            {site.email && (
              <a
                className="opacity-70 hover:opacity-100 transition"
                href={mailto:${site.email}}
              >
                {site.email}
              </a>
            )}
          </div>
        </section>

      </div>
    </div>
main
  );
}
