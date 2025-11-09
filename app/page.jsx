import Button from "../components/Button"; 
import PriceList from "../data/prices";
import Card from "../components/Card";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Section from "../components/Section";

const services = PRICES;
  {
    title: "Пудровые брови",
    description:
      "Воздушная пиксельная растушёвка, подчеркивающая природную густоту и архитектуру бровей. Без резких границ и плотностей.",
    price: "от 220 BYN"
  },
  {
    title: "Губы",
    description:
      "Сатиновая нежность, выравнивание контура и деликатное напыление цвета. Градиенты, придающие свежий тон и ухоженность.",
    price: "от 250 BYN"
  },
  {
    title: "Межресничка",
    description:
      "Тонкая линия по росту ресниц для выразительности взгляда. Абсолютно мягкий результат без эффекта косметики.",
    price: "от 7000 Руб"
  }
];

const galleryPlaceholders = Array.from({ length: 6 }).map((_, index) => index + 1);

const features = [
  {
    title: "Чистые техники",
    description: "Авторская подача цвета и пиксельная растушёвка без плотного заполнения.",
    Icon: function IconPalette() {
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-11 w-11 text-sand-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M12 20c-4.418 0-8-3.016-8-6.736C4 8.6 7.582 4 12 4s8 4.6 8 9.264c0 1.912-1.343 3.272-3.179 3.272-.507 0-.821-.198-1.15-.522-.458-.452-1.036-.514-1.671-.514-1.326 0-2 1.133-2 2.5 0 1.17-.94 2-2 2Z" />
          <circle cx="9" cy="10" r="1.2" />
          <circle cx="12.2" cy="8" r="1" />
          <circle cx="15.4" cy="11" r="1" />
        </svg>
      );
    }
  },
  {
    title: "Натуральная эстетика",
    description: "Подбор оттенка под вашу кожу и стиль. Результат — ухоженный, не перегруженный.",
    Icon: function IconFeather() {
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-11 w-11 text-sand-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 7c-4.5 0-9 4.5-9 9" />
          <path d="M20 7c-1.5-1.5-3.5-2-6-1" />
          <path d="M11 16 4 9" />
          <path d="M4 9h4" />
        </svg>
      );
    }
  },
  {
    title: "Стерильность и комфорт",
    description: "Одноразовые материалы, деликатная анестезия, продуманная постуходовая поддержка.",
    Icon: function IconShield() {
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-11 w-11 text-sand-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6.5 12 3l8 3.5V12c0 4.2-2.7 6.9-8 9-5.3-2.1-8-4.8-8-9Z" />
          <path d="M9 12.5 11 14l4-4" />
        </svg>
      );
    }
  }
];

export default function HomePage() {
  //список файлов в галереи 
  const galleryPlaceholders = [
   "portfolio-01.JPG",
    "portfolio-02.JPG",
    "portfolio-03.JPG",
      "portfolio-04.JPG",
        "portfolio-05.JPG",
          "portfolio-06.JPG", 
    ];
  return (  
  
    <div
      key={item}
    <>
      <div className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-10 md:flex-row md:items-center md:gap-20 md:px-8">
          <div className="flex flex-1 flex-col gap-8 md:gap-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.4em] text-ink/40">
                PM BY MADI
              </span>
              <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl">
                Современный перманентный макияж
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
                Натуральная эстетика. Брови, губы, межресничка — деликатные техники, которые усиливают индивидуальные черты и сохраняют свежесть.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="https://t.me/pm_by_madi" variant="primary" size="lg">
                Записаться в Telegram
              </Button>
              <Button href="#gallery" variant="secondary" size="lg" className="sm:ml-4">
                Смотреть работы
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5 rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-soft backdrop-blur md:max-w-md">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.3em] text-ink/40">Опыт</span>
                <span className="text-2xl font-semibold text-ink">7 лет практики</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.3em] text-ink/40">Подход</span>
                <span className="text-2xl font-semibold text-ink">Только натуральность</span>
              </div>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="relative h-[420px] w-full max-w-[420px] overflow-hidden rounded-[44px] border border-white/60 bg-hero-gradient shadow-glow">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-sand-200/40" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-white/80 px-8 py-10 backdrop-blur-xl">
                <span className="text-xs uppercase tracking-[0.4em] text-ink/40">Signature</span>
                <p className="font-serif text-2xl leading-snug text-ink">
                  Авторская техника напыления,
                  <br />
                  созданная под вашу анатомию.
                </p>
              </div>
            </div>
            <div className="absolute -right-6 top-16 hidden w-[220px] rotate-3 rounded-3xl border border-white/60 bg-white/80 px-6 py-5 text-sm text-ink/70 shadow-soft backdrop-blur md:block">
              <p>
                Консультация и полное сопровождение: подбор оттенка, уход, контроль заживления.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Section
        eyebrow="Идеальный штрих"
        title="Аккуратно, деликатно, чистыми техниками"
        description="Авторский стиль без перегруженности. Мы работаем на сертифицированных пигментах и создаём мягкий результат, который раскрывает природную красоту."
      >
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ title, description, Icon }, index) => (
            <div
              key={title}
              className="group flex flex-col gap-5 rounded-[32px] border border-ink/10 bg-white/70 p-7 shadow-soft backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-ink/20 hover:bg-white/90 animate-fade-up"
              style={{ animationDelay: `${0.15 * index + 0.2}s` }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sand-100/80 text-ink shadow-inner">
                <Icon />
              </div>
              <h3 className="text-xl font-semibold text-ink md:text-2xl">{title}</h3>
              <p className="text-base leading-relaxed text-ink/70">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Услуги"
        title="Подчёркиваем природную эстетику"
        description="Каждая процедура начинается с индивидуальной диагностики пропорций и цвета кожи. Создаём мягкие переходы и перламутровые полутона для ухоженного результата."
      >
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.title}
              title={service.title}
              description={service.description}
              price={service.price}
              className="animate-fade-up"
              style={{ animationDelay: `${0.15 * index + 0.3}s` }}
            />
          ))}
        </div>
      </Section> 
      
     <priceList />
      
      <Section
        id="gallery"
        eyebrow="Портфолио"
        title="До / После"
        description="Серия образов с лёгким перманентом. Линии, оттенки и пиксели — все подчинено гармонии и комфорту."
      >
      <div className="grid gap-5 md:grid-cols-3">
        {galleryPlaceholders.map((item, index) => (
  <div
    key={item}
    className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/70 p-4 shadow-soft"
    style={{ animationDelay: `${0.1 * index + 0.4}s` }}
  >
    {/* Фото */}
    <div className="relative h-64 w-full overflow-hidden rounded-[26px]">
      <img
        src={`/ ${item}`} //
        alt={`Работа ${index + 1}`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </div>

    {/* Текст поверх */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span className="text-lg uppercase tracking-[0.6em] text-ink/20">
        Before / After
      </span>
    </div>

    {/* Рамка */}
    <div className="absolute inset-6 rounded-[24px] border border-white/70 pointer-events-none" />
  </div>
))}
            <div
              key={item}
              className="group relative overflow-hidden rounded-[30px] border border-white/50 bg-white/70 p-4 shadow-soft backdrop-blur animate-fade-up"
              style={{ animationDelay: `${0.1 * index + 0.4}s` }}
            >
              <div className="relative h-64 w-full overflow-hidden rounded-[26px] bg-gradient-to-br from-sand-100 via-sand-200 to-sand-300">
                <div className="absolute inset-0 flex items-center justify-center text-ink/20">
                  <span className="text-lg uppercase tracking-[0.6em]">Before / After</span>
                </div>
                <div className="absolute inset-6 rounded-[24px] border border-white/70" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-24 md:pb-32" align="center">
        <CTA
          headline="Запись откроется в ближайшее время. Станьте первой в списке."
          description="Оставьте заявку в Telegram или напишите письмо — мы вернёмся с датами, подготовкой и мини-гидом по уходу."
          primaryAction={{ label: "Telegram", href: "https://t.me/pm_by_madi" }}
          secondaryAction={{ label: "hello@pm-by-madi.com", href: "hello@pm-by-madi.com" }}
          className="animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        />
      </Section>

      <Footer />
    </>
  );
}
