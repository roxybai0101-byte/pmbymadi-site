"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const portfolioSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  serviceId: z.string().optional().nullable(),
  coverImageId: z.string().optional().nullable(),
  tags: z.string().optional()
});

export async function createPortfolioItemAction(formData: FormData) {
  const parsed = portfolioSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    serviceId: formData.get("serviceId"),
    coverImageId: formData.get("coverImageId"),
    tags: formData.get("tags")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;
  let slug = slugify(data.title);
  const existing = await prisma.portfolioItem.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  await prisma.portfolioItem.create({
    data: {
      title: data.title,
      description: data.description,
      slug,
      serviceId: data.serviceId || null,
      coverImageId: data.coverImageId || null,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : []
    }
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

export async function updatePortfolioItemAction(formData: FormData) {
  const parsed = portfolioSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    serviceId: formData.get("serviceId"),
    coverImageId: formData.get("coverImageId"),
    tags: formData.get("tags")
  });

  if (!parsed.success || !parsed.data.id) {
    throw new Error("Не удалось обновить запись портфолио");
  }

  const data = parsed.data;

  await prisma.portfolioItem.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      serviceId: data.serviceId || null,
      coverImageId: data.coverImageId || null,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : []
    }
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

const deleteSchema = z.object({
  id: z.string().min(1)
});

export async function deletePortfolioItemAction(formData: FormData) {
  const parsed = deleteSchema.safeParse({
    id: formData.get("id")
  });

  if (!parsed.success) {
    throw new Error("Не удалось удалить запись портфолио");
  }

  await prisma.portfolioItem.delete({
    where: { id: parsed.data.id }
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}
