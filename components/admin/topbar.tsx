import type { Session } from "next-auth";

interface TopbarProps {
  session: Session;
}

export function AdminTopbar({ session }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/60 bg-white/70 px-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Админ-панель</h1>
        <p className="text-xs text-muted-foreground">Управляйте контентом сайта PM BY MADI</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-foreground">{session.user?.name ?? "Администратор"}</p>
        <p className="text-xs text-muted-foreground">{session.user?.email}</p>
      </div>
    </header>
  );
}
