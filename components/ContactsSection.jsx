import Section from "./Section";
import site from "@/data/site.json";
import Button from "./Button";

const contacts = [
  {
    label: "WhatsApp",
    href: site.whatsapp,
    description: "Быстрые ответы и запись в один клик"
  },
  {
    label: "Telegram",
    href: site.telegram,
    description: "Новости студии и личный чат с мастером"
  },
  {
    label: "Instagram",
    href: site.instagram,
    description: "Свежие работы, отзывы и закулисье процедур"
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    description: "Подробные консультации и документы"
  }
];

const mapUrl = "https://maps.google.com/maps?q=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%A2%D1%80%D1%83%D0%B1%D0%BD%D0%B0%D1%8F%2025&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default function ContactsSection() {
  return (
    <Section
      id="contacts"
      eyebrow="Контакты"
      title="Студия PM BY MADI в центре Москвы"
      description="Принимаю по предварительной записи. Студия расположена в пешей доступности от метро Цветной бульвар и Трубная."
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.32em] text-ink/40">Адрес</p>
            <p className="mt-3 text-lg font-medium text-ink">{site.address}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              Удобный график работы: ежедневно с 10:00 до 20:00. Парковка поблизости, бесплатный кофе и уютное пространство для ожидания.
            </p>
          </div>
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.32em] text-ink/40">Связаться</p>
            <div className="mt-4 flex flex-col gap-4">
              {contacts.map((contact) => (
                <div key={contact.label} className="flex flex-col gap-1">
                  <Button href={contact.href} variant="ghost" size="sm" className="justify-start px-0 text-sm tracking-[0.32em]">
                    {contact.label}
                  </Button>
                  <span className="text-sm text-ink/60">{contact.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-soft text-sm text-ink/60">
            <p className="uppercase tracking-[0.32em] text-ink/40">Телефон</p>
            <a href={`tel:${site.phone}`} className="mt-2 text-base text-ink hover:underline">
              {site.phone}
            </a>
          </div>
        </div>
        <div className="relative h-[320px] overflow-hidden rounded-[32px] border border-white/70 shadow-soft md:h-full">
          <iframe
            title="Карта расположения студии PM BY MADI"
            src={mapUrl}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </Section>
  );
}
