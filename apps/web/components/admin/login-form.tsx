"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Input, Label } from "@pmby/ui";

export function LoginForm() {
  const t = useTranslations("admin.login");
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = params.get("callbackUrl") ?? "/admin/dashboard";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl
    });

    setLoading(false);

    if (result?.error) {
      setError(t("error"));
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-[3rem] border border-brand-cocoa/10 bg-white/95 p-8 shadow-soft"
    >
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input id="email" name="email" type="email" required placeholder="admin@pmbymadi.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input id="password" name="password" type="password" required placeholder="••••••••" />
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "..." : t("submit")}
      </Button>
    </form>
  );
}
