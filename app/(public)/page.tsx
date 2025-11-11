import { Hero } from "@/components/site/hero";
import { ServiceGrid } from "@/components/site/service-grid";
import { PromoBanner } from "@/components/site/promo-banner";
import { PortfolioPreview } from "@/components/site/portfolio-preview";
import { ReviewsSection } from "@/components/site/reviews-section";
import { BlogPreview } from "@/components/site/blog-preview";
import { FinalCallToAction } from "@/components/site/cta";
import {
  getBlogPosts,
  getFeaturedServices,
  getPortfolio,
  getPromos,
  getReviews,
  getServiceCategories
} from "@/lib/data";
import { getSiteSettings } from "@/lib/settings";

export default async function HomePage() {
  const [settings, featured, promos, portfolio, reviews, posts] = await Promise.all([
    getSiteSettings(),
    getFeaturedServices(),
    getPromos(),
    getPortfolio(),
    getReviews(),
    getBlogPosts()
  ]);

  let services = featured;
  if (!services.length) {
    const categories = await getServiceCategories();
    services = categories
      .flatMap((category) =>
        category.services.map((service) => ({
          ...service,
          category: { name: category.name, slug: category.slug }
        }))
      )
      .slice(0, 6);
  }

  const activePromo = promos.find((promo) => promo.isActive) ?? null;

  return (
    <>
      <Hero
        headline={settings.hero.headline}
        subheadline={settings.hero.subheadline}
        ctaLabel={settings.hero.ctaLabel}
        ctaLink={settings.hero.ctaLink}
        secondaryCtaLabel={settings.hero.secondaryCtaLabel}
        secondaryCtaLink={settings.hero.secondaryCtaLink}
      />

      <ServiceGrid services={services} />

      <PromoBanner promo={activePromo} />

      <PortfolioPreview items={portfolio} />

      <ReviewsSection reviews={reviews} />

      <BlogPreview posts={posts} />

      <FinalCallToAction />
    </>
  );
}
