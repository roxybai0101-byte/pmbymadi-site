import gallery from "@/data/gallery.json";
import Section from "./Section";
import PortfolioGallery from "./PortfolioGallery";

export default function PortfolioSection() {
  return (
    <Section
      id="portfolio"
      eyebrow="Портфолио"
      title="Результаты до и после"
      description="Реальные работы без фильтров и ретуши. Выбираю пигменты с высокой стойкостью цвета и аккуратно работаю со световыми переходами, чтобы результат смотрелся естественно при любом освещении."
    >
      <PortfolioGallery items={gallery} />
    </Section>
  );
}
