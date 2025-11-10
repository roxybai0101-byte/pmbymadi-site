"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImageId: z.string().optional().nullable(),
  isPublished: z.coerce.boolean().optional(),
  publishedAt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

export async function createPostAction(formData: FormData) {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImageId: formData.get("coverImageId"),
    isPublished: formData.get("isPublished"),
    publishedAt: formData.get("publishedAt"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;
  let slug = slugify(data.title);
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  await prisma.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageId: data.coverImageId || null,
      isPublished: data.isPublished ?? false,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function updatePostAction(formData: FormData) {
  const parsed = postSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImageId: formData.get("coverImageId"),
    isPublished: formData.get("isPublished"),
    publishedAt: formData.get("publishedAt"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription")
  });

  if (!parsed.success || !parsed.data.id) {
    throw new Error("Не удалось обновить пост");
  }

  const data = parsed.data;

  await prisma.post.update({
    where: { id: data.id },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImageId: data.coverImageId || null,
      isPublished: data.isPublished ?? false,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/blog/" + (await prisma.post.findUnique({ where: { id: data.id }, select: { slug: true } }))?.slug);
}

const deletePostSchema = z.object({
  id: z.string().min(1)
});

export async function deletePostAction(formData: FormData) {
  const parsed = deletePostSchema.safeParse({
    id: formData.get("id")
  });

  if (!parsed.success) {
    throw new Error("Не удалось удалить пост");
  }

  await prisma.post.delete({
    where: { id: parsed.data.id }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
