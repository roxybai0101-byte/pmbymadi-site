"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  id: z.string().optional(),
  author: z.string().min(1),
  rating: z.coerce.number().min(1).max(5).default(5),
  content: z.string().min(1),
  serviceId: z.string().optional().nullable()
});

export async function createReviewAction(formData: FormData) {
  const parsed = reviewSchema.safeParse({
    author: formData.get("author"),
    rating: formData.get("rating"),
    content: formData.get("content"),
    serviceId: formData.get("serviceId")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  await prisma.review.create({
    data: {
      author: data.author,
      rating: data.rating,
      content: data.content,
      serviceId: data.serviceId || null,
      isFeatured: true
    }
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function updateReviewAction(formData: FormData) {
  const parsed = reviewSchema.safeParse({
    id: formData.get("id"),
    author: formData.get("author"),
    rating: formData.get("rating"),
    content: formData.get("content"),
    serviceId: formData.get("serviceId")
  });

  if (!parsed.success || !parsed.data.id) {
    throw new Error("Не удалось обновить отзыв");
  }

  const data = parsed.data;

  await prisma.review.update({
    where: { id: data.id },
    data: {
      author: data.author,
      rating: data.rating,
      content: data.content,
      serviceId: data.serviceId || null
    }
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

const deleteReviewSchema = z.object({
  id: z.string().min(1)
});

export async function deleteReviewAction(formData: FormData) {
  const parsed = deleteReviewSchema.safeParse({
    id: formData.get("id")
  });

  if (!parsed.success) {
    throw new Error("Не удалось удалить отзыв");
  }

  await prisma.review.delete({
    where: { id: parsed.data.id }
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}
