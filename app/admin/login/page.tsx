import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/forms/login-form";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-[32px] border border-border/60 bg-white/90 p-10 shadow-soft">
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl text-foreground">Админ-панель PM BY MADI</h1>
          <p className="text-sm text-muted-foreground">Войдите, чтобы управлять контентом сайта</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
