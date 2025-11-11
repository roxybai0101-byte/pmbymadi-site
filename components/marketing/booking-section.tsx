import type { Service, SiteSetting } from "@prisma/client";

import { SectionHeader } from "@/components/marketing/section-header";

import { BookingForm } from "./booking-form";

type BookingSectionProps = {
  services: Service[];
  settings: SiteSetting;
};

export function BookingSection({ services, settings }: BookingSectionProps) {
  return (
    <section className="section-padding">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <SectionHeader
          eyebrow="Запись"
          title="Готовы к мягким трансформациям?"
          description="Оставьте контакты и услугу, и я свяжусь с вами в WhatsApp, чтобы согласовать дату, подготовку и ответить на вопросы."
          align="center"
        />
        <BookingForm services={services} whatsappLink={settings.whatsappLink} />
      </div>
    </section>
  );
}
