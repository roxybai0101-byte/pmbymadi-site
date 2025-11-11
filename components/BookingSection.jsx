import Section from "./Section";
import BookingForm from "./BookingForm";
import site from "@/data/site.json";

const checklist = [
  "Подберу оттенок пигмента по вашему подтону кожи",
  "Расскажу о подготовке и уходе до/после процедуры",
  "Забронирую комфортное время и отправлю памятку"
];

export default function BookingSection() {
  return (
    <Section
      id="booking"
      eyebrow="Запись"
      title="Оставьте заявку и обсудим ваш перманент"
      description="Заполните форму — отвечу в WhatsApp, расскажу о нюансах процедур и подберу идеальное решение. Работаю только по предварительной записи."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <div className="flex flex-col gap-6">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-soft">
            <p className="text-base leading-relaxed text-ink/70">
              Мой кабинет расположен в центре — {site.address}. Бесплатная консультация перед любой процедурой. Приходите,
              покажу портфолио вживую и расскажу всё о заживлении.
            </p>
            <ul className="mt-6 grid gap-4 text-sm leading-relaxed text-ink/70">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-6 rounded-full bg-sand-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] border border-white/70 bg-white/60 p-8 text-sm leading-relaxed text-ink/60 shadow-soft">
            <p className="uppercase tracking-[0.32em] text-ink/40">Контакты</p>
            <div className="mt-3 flex flex-col gap-2 text-base text-ink/80">
              <a href={`tel:${site.phone}`} className="hover:text-ink" aria-label="Позвонить">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="hover:text-ink" aria-label="Написать на email">
                {site.email}
              </a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-ink" aria-label="Открыть Telegram">
                Telegram
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-ink" aria-label="Открыть WhatsApp">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <BookingForm />
      </div>
    </Section>
  );
}
