import reviews from "@/data/reviews.json";
import Section from "./Section";
import ReviewCarousel from "./ReviewCarousel";

export default function ReviewsSection() {
  return (
    <Section
      id="reviews"
      eyebrow="Отзывы"
      title="Голос клиенток PM BY MADI"
      description="Каждый отзыв — подтверждение того, что перманентный макияж может быть деликатным, комфортным и эстетичным."
    >
      <ReviewCarousel items={reviews} />
    </Section>
  );
}
