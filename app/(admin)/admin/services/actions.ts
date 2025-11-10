"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const createServiceSchema = z.object({
  categoryId: z.string().min(1, "Выберите категорию"),
  title: z.string().min(1, "Заполните название"),
  excerpt: z.string().optional(),
  basePrice: z.coerce.number().optional(),
  duration: z.string().optional()
});

export async function createServiceAction(formData: FormData) {
  const parsed = createServiceSchema.safeParse({
    categoryId: formData.get("categoryId"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    basePrice: formData.get("basePrice"),
    duration: formData.get("duration")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;
  let slug = slugify(data.title);

  const exists = await prisma.service.findUnique({ where: { slug } });
  if (exists) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  await prisma.service.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      duration: data.duration,
      categoryId: data.categoryId,
      prices: data.basePrice
        ? {
            create: {
              name: "Основная процедура",
              amount: Math.round(data.basePrice),
              order: 1
            }
          }
        : undefined
    }
  });

  revalidatePath("/admin/services");
  revalidatePath("/");
}

const deleteServiceSchema = z.object({
  id: z.string().min(1)
});

export async function deleteServiceAction(formData: FormData) {
  const parsed = deleteServiceSchema.safeParse({ id: formData.get("id") });

  if (!parsed.success) {
    throw new Error("Не удалось удалить услугу");
  }

  await prisma.service.delete({
    where: { id: parsed.data.id }
  });

  revalidatePath("/admin/services");
  revalidatePath("/");
}
