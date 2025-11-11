import { z } from "zod";

export const idSchema = z.string().cuid({ message: "Неверный идентификатор" });

export const categorySchema = z.object({
  id: idSchema.optional(),
  name: z.string().min(2, "Введите название"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug может содержать латиницу, цифры и дефис")
    .optional(),
  description: z.string().max(600).optional().or(z.literal("")),
  order: z.coerce.number().min(0).max(999).optional()
});

export const serviceSchema = z.object({
  id: idSchema.optional(),
  categoryId: idSchema,
  title: z.string().min(2, "Введите название услуги"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug может содержать латиницу, цифры и дефис")
    .optional(),
  excerpt: z.string().max(400).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  preparation: z.string().optional().or(z.literal("")),
  contraindications: z.string().optional().or(z.literal("")),
  aftercare: z.string().optional().or(z.literal("")),
  duration: z.string().optional().or(z.literal("")),
  spotlightText: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("Некорректный URL").optional().or(z.literal("")),
  isFeatured: z
    .preprocess(
      (value) => {
        if (typeof value === "string") {
          return value === "true" || value === "on" || value === "1";
        }
        return Boolean(value);
      },
      z.boolean()
    )
    .optional()
});

export const priceSchema = z.object({
  id: idSchema.optional(),
  serviceId: idSchema,
  title: z.string().min(2, "Введите название позиции"),
  amount: z.coerce.number().min(0, "Стоимость должна быть больше 0"),
  description: z.string().optional().or(z.literal("")),
  duration: z.string().optional().or(z.literal(""))
});

export const portfolioSchema = z.object({
  id: idSchema.optional(),
  title: z.string().min(2, "Введите заголовок"),
  description: z.string().optional().or(z.literal("")),
  imageId: idSchema.optional().or(z.literal("")),
  serviceId: idSchema.optional().or(z.literal("")),
  order: z.coerce.number().min(0).max(9999).optional()
});

export const reviewSchema = z.object({
  id: idSchema.optional(),
  name: z.string().min(2, "Введите имя клиента"),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(10, "Добавьте текст отзыва"),
  source: z.string().optional().or(z.literal("")),
  serviceId: idSchema.optional().or(z.literal(""))
});

export const promoSchema = z.object({
  id: idSchema.optional(),
  title: z.string().min(2, "Введите заголовок акции"),
  description: z.string().optional().or(z.literal("")),
  details: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("Некорректный URL").optional().or(z.literal("")),
  isActive: z.coerce.boolean().optional(),
  startsAt: z.string().optional().or(z.literal("")),
  endsAt: z.string().optional().or(z.literal(""))
});

export const postSchema = z.object({
  id: idSchema.optional(),
  title: z.string().min(2, "Введите заголовок"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug может содержать латиницу, цифры и дефис")
    .optional(),
  excerpt: z.string().max(400).optional().or(z.literal("")),
  content: z.string().min(20, "Добавьте контент статьи"),
  coverId: idSchema.optional().or(z.literal("")),
  publishedAt: z.string().optional().or(z.literal(""))
});

export const pageSchema = z.object({
  id: idSchema.optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug может содержать латиницу, цифры и дефис"),
  title: z.string().min(2, "Введите заголовок страницы"),
  description: z.string().optional().or(z.literal("")),
  content: z.string().min(20, "Добавьте содержимое страницы"),
  metaTitle: z.string().optional().or(z.literal("")),
  metaDescription: z.string().optional().or(z.literal(""))
});

export const faqSchema = z.object({
  id: idSchema.optional(),
  question: z.string().min(2, "Введите вопрос"),
  answer: z.string().min(5, "Введите ответ"),
  order: z.coerce.number().min(0).max(999).optional()
});

export const submissionStatusSchema = z.object({
  id: idSchema,
  status: z.enum(["NEW", "IN_PROGRESS", "COMPLETED"])
});

export const bookingSubmissionSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  contact: z.string().min(5, "Укажите контакт для связи"),
  serviceId: idSchema.optional().or(z.literal("")),
  comment: z.string().optional().or(z.literal(""))
});

export const questionSubmissionSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  contact: z.string().min(5, "Укажите контакт для связи"),
  message: z.string().min(10, "Опишите ваш вопрос подробнее")
});

export const brandingSettingsSchema = z.object({
  brand: z.string().min(2),
  tagline: z.string().optional().or(z.literal("")),
  logoText: z.string().optional().or(z.literal("")),
  logoUrl: z.string().url().optional().or(z.literal("null")).or(z.literal("")).transform((value) => {
    if (value === "null" || value === "") return null;
    return value;
  })
});

export const contactsSettingsSchema = z.object({
  phone: z.string().min(5),
  email: z.string().email(),
  whatsapp: z.string().url().optional().or(z.literal("")),
  telegram: z.string().url().optional().or(z.literal("")),
  address: z.string().min(3),
  mapEmbedUrl: z.string().url().optional().or(z.literal(""))
});

export const socialsSettingsSchema = z.object({
  instagram: z.string().url().optional().or(z.literal("")),
  telegram: z.string().url().optional().or(z.literal("")),
  whatsapp: z.string().url().optional().or(z.literal("")),
  vk: z.string().url().optional().or(z.literal(""))
});

export const hoursSettingsSchema = z.object({
  weekdays: z.string().optional().or(z.literal("")),
  weekend: z.string().optional().or(z.literal("")),
  note: z.string().optional().or(z.literal(""))
});

export const heroSettingsSchema = z.object({
  headline: z.string().min(5),
  subheadline: z.string().min(5),
  ctaLabel: z.string().min(2),
  ctaLink: z.string().min(1),
  secondaryCtaLabel: z.string().optional().or(z.literal("")),
  secondaryCtaLink: z.string().optional().or(z.literal(""))
});
