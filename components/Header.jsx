import Button from "./Button";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <div className="flex flex-col gap-1 text-ink">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-ink/60">
            PM BY MADI
          </span>
          <span className="text-base font-serif md:text-lg">Premium Permanent Makeup</span>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Запись скоро</p>
          <Button
            href="https://t.me/pm_by_madi"
            variant="outline"
            size="sm"
          >
            Telegram
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
