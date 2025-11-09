// components/PriceList.jsx
import Section from "./Section";
import Card from "./Card";
import { PRICES } from "../data/prices";

export default function PriceList() {
  return (
    <Section
      id="prices"
      eyebrow="Прайс"
      title="Стоимость процедур"
      description="Цены могут меняться в зависимости от индивидуальных особенностей."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {PRICES.map(({ title, price, note }, i) => (
          <Card
            key={title}
            title={title}
            description={note || "Запись доступна в Telegram"}
            price={price}
            className="animate-fade-up"
            style={{ animationDelay: ${0.1 * i + 0.2}s }}
          />
        ))}
      </div>
    </Section>
  );
}
