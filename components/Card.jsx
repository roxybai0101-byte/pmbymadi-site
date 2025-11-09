import Image from "next/image";
import { cn } from "../lib/utils";

function Card({
  title,
  description,
  price,
  image,
  className,
  children,
  ...props
}) {
  return (
    <article
      className={cn(
        "glass-card group relative overflow-hidden p-6 md:p-8",
        "hover:shadow-glow hover:border-white/60 hover:bg-white/85",
        className
      )}
      {...props}
    >
      <div className="relative mb-6 overflow-hidden rounded-3xl">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={640}
            height={480}
            className="h-48 w-full rounded-3xl object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="relative h-48 w-full overflow-hidden rounded-3xl">
            <span className="absolute inset-0 bg-gradient-to-br from-sand-100 via-sand-200 to-sand-300 transition-transform duration-700 ease-out group-hover:scale-105" />
            <span className="absolute inset-0 opacity-50 mix-blend-soft-light" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-6 bottom-6 flex justify-between text-xs font-medium uppercase tracking-[0.3em] text-ink/60">
          <span>До / После</span>
          <span>PM BY MADI</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-ink md:text-2xl">{title}</h3>
          {price && <span className="text-sm font-medium text-ink/60">{price}</span>}
        </div>
        {description && <p className="text-base leading-relaxed text-ink/70">{description}</p>}
        {children}
      </div>
    </article>
  );
}

export default Card;
