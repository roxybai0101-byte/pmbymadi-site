"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов")
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: LoginValues) => {
    setFormError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    });

    if (result?.error) {
      setFormError("Неверный email или пароль");
      toast({
        variant: "destructive",
        title: "Не удалось войти",
        description: "Проверьте данные и попробуйте снова."
      });
    } else {
      toast({
        variant: "success",
        title: "Добро пожаловать",
        description: "Вы успешно вошли в админ-панель."
      });
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="admin@example.com" {...register("email")} />
        {errors.email ? <ErrorText>{errors.email.message}</ErrorText> : null}
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" placeholder="Введите пароль" {...register("password")} />
        {errors.password ? <ErrorText>{errors.password.message}</ErrorText> : null}
      </div>
      {formError ? <ErrorText>{formError}</ErrorText> : null}
      <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting}>
        {isSubmitting ? "Входим..." : "Войти"}
      </Button>
    </form>
  );
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-2 text-xs text-destructive">{children}</p>;
}
