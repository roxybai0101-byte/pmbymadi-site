"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const simplePageSchema = z.object({
  slug: z.enum(["about", "policy", "offer"]),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  markdown: z.string().min(1),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

export async function updateSimplePageAction(formData: FormData) {
  const parsed = simplePageSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    markdown: formData.get("markdown"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  await prisma.page.update({
    where: { slug: data.slug },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      content: {
        markdown: data.markdown
      },
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription
    }
  });

  revalidatePath("/admin/pages");
  revalidatePath(`/${data.slug}`);
}

const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

const faqSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  items: z.array(faqItemSchema)
});

export async function updateFaqPageAction(formData: FormData) {
  const items: Array<{ question: string; answer: string }> = [];
  const rawItems = formData.getAll("question");
  const rawAnswers = formData.getAll("answer");

  for (let i = 0; i < rawItems.length; i += 1) {
    const question = String(rawItems[i] ?? "").trim();
    const answer = String(rawAnswers[i] ?? "").trim();
    if (question && answer) {
      items.push({ question, answer });
    }
  }

  const parsed = faqSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    items
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  await prisma.page.update({
    where: { slug: "faq" },
    data: {
      title: data.title,
      excerpt: data.excerpt,
      content: {
        items: data.items
      },
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription
    }
  });

  revalidatePath("/admin/pages");
  revalidatePath("/faq");
}
