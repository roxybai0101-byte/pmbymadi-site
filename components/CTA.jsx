import Button from "./Button";
import { cn } from "@/lib/utils";

function CTA({
  headline,
  description,
  primaryAction,
  secondaryAction,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[40px] bg-ink text-ivory shadow-soft",
        "px-8 py-12 md:px-12 md:py-16",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,165,129,0.35),transparent_55%)]" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-ivory/60">
            Запись скоро открывается
          </span>
          <h3 className="font-serif text-3xl leading-tight md:text-4xl">{headline}</h3>
          {description && (
            <p className="text-base leading-relaxed text-ivory/70 md:text-lg">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 md:min-w-[240px] md:items-end">
          {primaryAction && (
            <Button
              href={primaryAction.href}
              variant="secondary"
              size="lg"
              className="bg-ivory text-ink hover:bg-ivory/90"
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              href={`mailto:${secondaryAction.href}`}
              variant="ghost"
              size="sm"
              className="text-ivory/80 hover:text-ivory"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CTA;
