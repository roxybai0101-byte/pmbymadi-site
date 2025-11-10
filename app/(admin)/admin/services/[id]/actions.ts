"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const updateServiceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  description: z.string().optional(),
  preparation: z.string().optional(),
  aftercare: z.string().optional(),
  contraindications: z.string().optional(),
  duration: z.string().optional()
});

export async function updateServiceDetailsAction(formData: FormData) {
  const parsed = updateServiceSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    description: formData.get("description"),
    preparation: formData.get("preparation"),
    aftercare: formData.get("aftercare"),
    contraindications: formData.get("contraindications"),
    duration: formData.get("duration")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  const updated = await prisma.service.update({
    where: { id: data.id },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      description: data.description,
      preparation: data.preparation,
      aftercare: data.aftercare,
      contraindications: data.contraindications,
      duration: data.duration
    },
    select: { slug: true }
  });

  revalidatePath(`/admin/services/${data.id}`);
  revalidatePath("/services");
  revalidatePath(`/services/${updated.slug}`);
  revalidatePath("/");
}

const priceSchema = z.object({
  serviceId: z.string().min(1),
  name: z.string().min(1),
  amount: z.coerce.number().nullable(),
  description: z.string().optional()
});

export async function createPriceAction(formData: FormData) {
  const parsed = priceSchema.safeParse({
    serviceId: formData.get("serviceId"),
    name: formData.get("name"),
    amount: formData.get("amount"),
    description: formData.get("description")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  await prisma.price.create({
    data: {
      serviceId: data.serviceId,
      name: data.name,
      amount: data.amount ?? null,
      description: data.description
    }
  });

  revalidatePath(`/admin/services/${data.serviceId}`);
  const slug = await prisma.service.findUnique({
    where: { id: data.serviceId },
    select: { slug: true }
  });
  if (slug?.slug) {
    revalidatePath(`/services/${slug.slug}`);
  }
  revalidatePath("/services");
  revalidatePath("/");
}

const updatePriceSchema = z.object({
  id: z.string().min(1),
  serviceId: z.string().min(1),
  name: z.string().min(1),
  amount: z.coerce.number().nullable(),
  description: z.string().optional()
});

export async function updatePriceAction(formData: FormData) {
  const parsed = updatePriceSchema.safeParse({
    id: formData.get("id"),
    serviceId: formData.get("serviceId"),
    name: formData.get("name"),
    amount: formData.get("amount"),
    description: formData.get("description")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  await prisma.price.update({
    where: { id: data.id },
    data: {
      name: data.name,
      amount: data.amount ?? null,
      description: data.description
    }
  });

  revalidatePath(`/admin/services/${data.serviceId}`);
  const slug = await prisma.service.findUnique({
    where: { id: data.serviceId },
    select: { slug: true }
  });
  if (slug?.slug) {
    revalidatePath(`/services/${slug.slug}`);
  }
  revalidatePath("/services");
  revalidatePath("/");
}

const deletePriceSchema = z.object({
  id: z.string().min(1),
  serviceId: z.string().min(1)
});

export async function deletePriceAction(formData: FormData) {
  const parsed = deletePriceSchema.safeParse({
    id: formData.get("id"),
    serviceId: formData.get("serviceId")
  });

  if (!parsed.success) {
    throw new Error("Не удалось удалить цену");
  }

  await prisma.price.delete({
    where: { id: parsed.data.id }
  });

  revalidatePath(`/admin/services/${parsed.data.serviceId}`);
  const slug = await prisma.service.findUnique({
    where: { id: parsed.data.serviceId },
    select: { slug: true }
  });
  if (slug?.slug) {
    revalidatePath(`/services/${slug.slug}`);
  }
  revalidatePath("/services");
  revalidatePath("/");
}
