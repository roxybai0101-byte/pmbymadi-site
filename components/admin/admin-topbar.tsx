import { UserMenu } from "@/components/admin/user-menu";

type AdminTopbarProps = {
  user: {
    name?: string | null;
    email?: string | null;
  };
};

export function AdminTopbar({ user }: AdminTopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Управление контентом</p>
        <h1 className="font-serif text-2xl text-foreground">PM BY MADI</h1>
      </div>
      <UserMenu email={user.email} name={user.name} />
    </header>
  );
}
