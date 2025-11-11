import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string({ required_error: "Введите email" }).email("Введите корректный email"),
  password: z
    .string({ required_error: "Введите пароль" })
    .min(6, "Пароль должен содержать минимум 6 символов")
});

export type CredentialsSchema = z.infer<typeof credentialsSchema>;
