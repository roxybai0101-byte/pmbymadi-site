"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const promoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  body: z.string().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

export async function createPromoAction(formData: FormData) {
  const parsed = promoSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    isActive: formData.get("isActive"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;
  let slug = slugify(data.title);
  const existing = await prisma.promo.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  await prisma.promo.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      body: data.body,
      startsAt: data.startsAt ? new Date(data.startsAt) : null,
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      isActive: data.isActive ?? true,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription
    }
  });

  revalidatePath("/admin/promos");
  revalidatePath("/promos");
  revalidatePath("/");
}

export async function updatePromoAction(formData: FormData) {
  const parsed = promoSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
    isActive: formData.get("isActive"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription")
  });

  if (!parsed.success || !parsed.data.id) {
    throw new Error("Не удалось обновить акцию");
  }

  const data = parsed.data;

  await prisma.promo.update({
    where: { id: data.id },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      body: data.body,
      startsAt: data.startsAt ? new Date(data.startsAt) : null,
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      isActive: data.isActive ?? false,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription
    }
  });

  revalidatePath("/admin/promos");
  revalidatePath("/promos");
  revalidatePath("/");
}

const deletePromoSchema = z.object({
  id: z.string().min(1)
});

export async function deletePromoAction(formData: FormData) {
  const parsed = deletePromoSchema.safeParse({
    id: formData.get("id")
  });

  if (!parsed.success) {
    throw new Error("Не удалось удалить акцию");
  }

  await prisma.promo.delete({
    where: { id: parsed.data.id }
  });

  revalidatePath("/admin/promos");
  revalidatePath("/promos");
  revalidatePath("/");
}
