import Link from "next/link";
import type { AppLocale } from "../../../lib/i18n";
import { buildWhatsappUrl } from "../../../lib/utils";
import { Badge, Button, Container, SectionDescription, SectionHeading } from "@pmby/ui";

interface HeroProps {
  locale: AppLocale;
  translations: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bullets: string[];
    note: string;
  };
  whatsappPhone?: string | null;
}

export function HeroSection({ locale, translations, whatsappPhone }: HeroProps) {
  const whatsappLink =
    buildWhatsappUrl(
      whatsappPhone ?? process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "+48000000000",
      locale === "ru" ? "Здравствуйте! Хочу записаться на перманентный макияж." : "Hello! I'd like to book permanent makeup."
    ) ?? "#";

  return (
    <section className="relative overflow-hidden pb-24 pt-20">
      <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-8">
          <Badge className="bg-brand-gold/80 text-brand-chocolate/90">PM BY MADI</Badge>
          <SectionHeading accent="Beauty">
            <span className="block">{translations.headline}</span>
          </SectionHeading>
          <SectionDescription>{translations.subheadline}</SectionDescription>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={whatsappLink}>{translations.ctaPrimary}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/portfolio`}>{translations.ctaSecondary}</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-brand-chocolate/70">
            {translations.bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-gold" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
          <div className="relative h-[360px] w-full rounded-[2.5rem] bg-white/60 shadow-soft backdrop-blur-md">
          <div className="absolute inset-6 rounded-[2rem] border border-brand-cocoa/20 bg-[url('/social-card-1080.png')] bg-cover bg-center" />
          <div className="absolute bottom-6 left-6 rounded-3xl bg-white/90 px-6 py-4 shadow-soft">
              <p className="text-sm font-medium text-brand-chocolate">{translations.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
