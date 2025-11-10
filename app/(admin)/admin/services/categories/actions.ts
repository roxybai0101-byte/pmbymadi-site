"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const categorySchema = z.object({
  name: z.string().min(1, "Введите название"),
  description: z.string().optional(),
  order: z.coerce.number().int().optional()
});

export async function createCategoryAction(formData: FormData) {
  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    order: formData.get("order")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;
  let slug = slugify(data.name);

  const exists = await prisma.serviceCategory.findUnique({ where: { slug } });
  if (exists) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  await prisma.serviceCategory.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      order: data.order ?? 0
    }
  });

  revalidatePath("/admin/services");
  revalidatePath("/admin/services/categories");
}

const updateCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  order: z.coerce.number().int().optional()
});

export async function updateCategoryAction(formData: FormData) {
  const parsed = updateCategorySchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    order: formData.get("order")
  });

  if (!parsed.success) {
    throw new Error("Не удалось обновить категорию");
  }

  const data = parsed.data;

  await prisma.serviceCategory.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      order: data.order ?? 0
    }
  });

  revalidatePath("/admin/services");
  revalidatePath("/admin/services/categories");
}

const deleteCategorySchema = z.object({
  id: z.string().min(1)
});

export async function deleteCategoryAction(formData: FormData) {
  const parsed = deleteCategorySchema.safeParse({
    id: formData.get("id")
  });

  if (!parsed.success) {
    throw new Error("Не удалось удалить категорию");
  }

  await prisma.service.deleteMany({
    where: { categoryId: parsed.data.id }
  });

  await prisma.serviceCategory.delete({
    where: { id: parsed.data.id }
  });

  revalidatePath("/admin/services");
  revalidatePath("/admin/services/categories");
}
