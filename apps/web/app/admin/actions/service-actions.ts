"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "../../../lib/prisma";

const serviceSchema = z.object({
  id: z.string().optional(),
  titleRu: z.string().min(2),
  titleEn: z.string().min(2),
  descriptionRu: z.string().min(4),
  descriptionEn: z.string().min(4),
  slug: z.string().min(2),
  duration: z.string().optional(),
  price: z.number().int().nonnegative().optional(),
  order: z.number().int().optional(),
  seoTitleRu: z.string().optional(),
  seoTitleEn: z.string().optional(),
  seoDescriptionRu: z.string().optional(),
  seoDescriptionEn: z.string().optional(),
  published: z.boolean().optional()
});

function parseServiceForm(formData: FormData) {
  const priceInput = formData.get("price")?.toString();
  const price = priceInput ? Math.round(parseFloat(priceInput) * 100) : undefined;
  return serviceSchema.parse({
    id: formData.get("id")?.toString() || undefined,
    titleRu: formData.get("title_ru")?.toString() ?? "",
    titleEn: formData.get("title_en")?.toString() ?? "",
    descriptionRu: formData.get("description_ru")?.toString() ?? "",
    descriptionEn: formData.get("description_en")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    duration: formData.get("duration")?.toString() ?? undefined,
    price,
    order: formData.get("order") ? Number(formData.get("order")) : undefined,
    seoTitleRu: formData.get("seo_title_ru")?.toString() ?? undefined,
    seoTitleEn: formData.get("seo_title_en")?.toString() ?? undefined,
    seoDescriptionRu: formData.get("seo_description_ru")?.toString() ?? undefined,
    seoDescriptionEn: formData.get("seo_description_en")?.toString() ?? undefined,
    published: formData.get("published") === "on" || formData.get("published") === "true"
  });
}

function revalidateMarketing() {
  revalidatePath("/ru");
  revalidatePath("/en");
  revalidatePath("/ru/services");
  revalidatePath("/en/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  const data = parseServiceForm(formData);

  await prisma.service.create({
    data: {
      slug: data.slug,
      title: { ru: data.titleRu, en: data.titleEn },
      description: { ru: data.descriptionRu, en: data.descriptionEn },
      duration: data.duration,
      price: data.price,
      order: data.order ?? 0,
      seoTitle: { ru: data.seoTitleRu, en: data.seoTitleEn },
      seoDescription: { ru: data.seoDescriptionRu, en: data.seoDescriptionEn },
      published: data.published ?? false
    }
  });

  revalidateMarketing();
}

export async function updateService(formData: FormData) {
  const data = parseServiceForm(formData);
  if (!data.id) {
    throw new Error("Service ID required");
  }

  await prisma.service.update({
    where: { id: data.id },
    data: {
      slug: data.slug,
      title: { ru: data.titleRu, en: data.titleEn },
      description: { ru: data.descriptionRu, en: data.descriptionEn },
      duration: data.duration,
      price: data.price,
      order: data.order ?? 0,
      seoTitle: { ru: data.seoTitleRu, en: data.seoTitleEn },
      seoDescription: { ru: data.seoDescriptionRu, en: data.seoDescriptionEn },
      published: data.published ?? false
    }
  });

  revalidateMarketing();
}

export async function deleteService(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    throw new Error("Service ID required");
  }
  await prisma.service.delete({ where: { id } });
  revalidateMarketing();
}

export async function toggleServicePublish(formData: FormData) {
  const id = formData.get("id")?.toString();
  const published = formData.get("published") === "true";
  if (!id) {
    throw new Error("Service ID required");
  }

  await prisma.service.update({
    where: { id },
    data: { published }
  });

  revalidateMarketing();
}
