import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string({ required_error: "Введите ваше имя" })
    .min(2, "Имя должно содержать минимум 2 символа"),
  phone: z
    .string({ required_error: "Укажите номер телефона" })
    .min(8, "Укажите номер телефона")
    .regex(/^[0-9+\s()-]+$/, "Только цифры и символы +, -, (, )"),
  serviceId: z.string({ required_error: "Выберите услугу" }),
  comment: z.string().max(300, "Максимум 300 символов").optional()
});

export type BookingSchema = z.infer<typeof bookingSchema>;
