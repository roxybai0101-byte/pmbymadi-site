"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const siteSettingsSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  subheading: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

export async function updateSiteSettingsAction(formData: FormData) {
  const parsed = siteSettingsSchema.safeParse({
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    subheading: formData.get("subheading"),
    ctaLabel: formData.get("ctaLabel"),
    ctaHref: formData.get("ctaHref"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription")
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  await prisma.setting.upsert({
    where: { key: "site" },
    create: {
      key: "site",
      value: {
        name: data.name,
        tagline: data.tagline,
        subheading: data.subheading,
        cta: {
          label: data.ctaLabel,
          href: data.ctaHref
        },
        seo: {
          title: data.seoTitle,
          description: data.seoDescription
        }
      }
    },
    update: {
      value: {
        name: data.name,
        tagline: data.tagline,
        subheading: data.subheading,
        cta: {
          label: data.ctaLabel,
          href: data.ctaHref
        },
        seo: {
          title: data.seoTitle,
          description: data.seoDescription
        }
      }
    }
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}

const contactSettingsSchema = z.object({
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  instagram: z.string().optional(),
  telegram: z.string().optional(),
  tiktok: z.string().optional(),
  mapEmbed: z.string().optional(),
  workingDays: z.array(
    z.object({
      days: z.string().min(1),
      time: z.string().min(1)
    })
  )
});

export async function updateContactSettingsAction(formData: FormData) {
  const workingDays: Array<{ days: string; time: string }> = [];
  const days = formData.getAll("days");
  const times = formData.getAll("time");

  for (let i = 0; i < days.length; i += 1) {
    const day = String(days[i] ?? "").trim();
    const time = String(times[i] ?? "").trim();
    if (day && time) {
      workingDays.push({ days: day, time });
    }
  }

  const parsed = contactSettingsSchema.safeParse({
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    address: formData.get("address"),
    instagram: formData.get("instagram"),
    telegram: formData.get("telegram"),
    tiktok: formData.get("tiktok"),
    mapEmbed: formData.get("mapEmbed"),
    workingDays
  });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((error) => error.message).join(", "));
  }

  const data = parsed.data;

  await prisma.setting.upsert({
    where: { key: "contacts" },
    create: {
      key: "contacts",
      value: {
        ...data,
        workingHours: data.workingDays
      }
    },
    update: {
      value: {
        ...data,
        workingHours: data.workingDays
      }
    }
  });

  revalidatePath("/admin/settings");
  revalidatePath("/contacts");
  revalidatePath("/");
}
