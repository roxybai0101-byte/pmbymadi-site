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
  );
}
