import site from "@/data/site.json";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-col gap-2 text-ink/70">
          <p className="text-xs uppercase tracking-[0.32em] text-ink/40">
            {site.brand}
          </p>
          <p className="font-serif text-xl text-ink">
            {site.slogan}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.28em] text-ink/40 md:flex-row md:items-center md:gap-5">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Instagram
          </a>
          <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Telegram
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            WhatsApp
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            Email
          </a>
        </div>
      </div>
      <div className="border-t border-white/60 bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-ink/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {year} {site.brand}. Все права защищены.</p>
          <p className="uppercase tracking-[0.28em]">Перманентный макияж в Москве</p>
        </div>
      </div>
    </footer>
  );
}
