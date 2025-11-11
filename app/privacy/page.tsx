import type { Metadata } from "next";

import { PageHero } from "@/components/marketing/page-hero";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://pm-by-madi.com";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — PM BY MADI",
  description:
    "Политика конфиденциальности и правила обработки персональных данных студии перманентного макияжа PM BY MADI.",
  alternates: {
    canonical: `${siteUrl}/privacy`
  }
};

export default function PrivacyPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Политика"
        title="Политика конфиденциальности"
        description="Мы бережно относимся к персональным данным и используем их только для связи по вопросам записи и сопровождения клиента."
      />
      <section className="mx-auto w-full max-w-4xl space-y-6 px-6 pb-16">
        <article className="space-y-4 text-sm leading-relaxed text-brand-cocoa/80">
          <p>
            Студия PM BY MADI обрабатывает персональные данные клиентов исключительно для
            записи на процедуры, обратной связи и информирования о сопровождении после
            услуги. Мы не передаём данные третьим лицам без вашего согласия и соблюдаем
            требования Закона Республики Казахстан «О персональных данных и их защите».
          </p>
          <p>
            Оставляя заявку через формы на сайте или обращаясь в WhatsApp/Telegram, вы
            подтверждаете согласие на обработку персональных данных и получение сообщений,
            связанных с записью и сопровождением. Вы можете запросить удаление данных,
            написав на почту{" "}
            <a href="mailto:hello@pm-by-madi.com" className="underline-offset-4 hover:underline">
              hello@pm-by-madi.com
            </a>
            .
          </p>
          <p>
            Информация о клиентах хранится на защищённых серверах и доступна только мастеру.
            Мы используем современные средства защиты и регулярно обновляем программное
            обеспечение.
          </p>
        </article>
      </section>
    </div>
  );
}
