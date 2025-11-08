import { Container, SectionDescription, SectionHeading } from "@pmby/ui";

interface AboutSectionProps {
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
}

export function AboutSection({ title, description, stats = [] }: AboutSectionProps) {
  return (
    <section className="pb-20">
      <Container className="grid gap-10 rounded-[3rem] bg-white/80 p-8 shadow-soft md:grid-cols-[1fr_auto] md:p-12">
        <div className="space-y-6">
          <SectionHeading accent="Studio">{title}</SectionHeading>
          <SectionDescription>{description}</SectionDescription>
        </div>
        {stats.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-brand-cocoa/10 bg-brand-powder/60 p-6">
                <p className="text-3xl font-serif text-brand-chocolate">{item.value}</p>
                <p className="mt-2 text-sm text-brand-cocoa/70">{item.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
