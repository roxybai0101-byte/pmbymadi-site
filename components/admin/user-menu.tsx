"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

type UserMenuProps = {
  name?: string | null;
  email?: string | null;
};

export function UserMenu({ name, email }: UserMenuProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-right">
        <p className="font-medium text-foreground">{name ?? "Администратор"}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>
      <Button
        onClick={() => {
          void signOut({ callbackUrl: "/admin/login" });
        }}
        size="sm"
        variant="outline"
      >
        Выйти
      </Button>
    </div>
  );
}
