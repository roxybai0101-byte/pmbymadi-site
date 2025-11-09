import { cn } from "../lib/utils";

function Section({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children
}) {
  const alignment =
    align === "center"
      ? "text-center items-center"
      : align === "right"
        ? "text-right items-end"
        : "text-left items-start";

  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:px-8">
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "flex flex-col gap-4 md:gap-5",
              alignment
            )}
          >
            {eyebrow && (
              <span className="text-xs font-medium uppercase tracking-[0.4em] text-ink/50">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-serif text-3xl leading-snug text-ink md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
