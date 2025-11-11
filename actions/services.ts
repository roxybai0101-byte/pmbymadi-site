import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { idSchema, priceSchema, serviceSchema } from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

const createServiceSchema = serviceSchema.omit({ id: true });
const updateServiceSchema = serviceSchema.extend({ id: idSchema });

const createPriceSchema = priceSchema.omit({ id: true });
const updatePriceSchema = priceSchema.extend({ id: idSchema });

function normalizeString(value?: string | null) {
  if (!value || value.trim().length === 0) return null;
  return value.trim();
}

function triggerRevalidate(slugs: string[]) {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/portfolio");
  revalidatePath("/admin/services");
  slugs.forEach((slug) => {
    if (slug) {
      revalidatePath(`/services/${slug}`);
    }
  });
}

export async function createService(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createServiceSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось добавить услугу", parsed.error.flatten().fieldErrors);
  }

  const {
    categoryId,
    title,
    slug,
    excerpt,
    description,
    preparation,
    contraindications,
    aftercare,
    duration,
    spotlightText,
    imageUrl,
    isFeatured
  } = parsed.data;

  const finalSlug = slug && slug.length > 0 ? slug : slugify(title);

  await prisma.service.create({
    data: {
      categoryId,
      title,
      slug: finalSlug,
      excerpt: normalizeString(excerpt) ?? null,
      description: normalizeString(description),
      preparation: normalizeString(preparation),
      contraindications: normalizeString(contraindications),
      aftercare: normalizeString(aftercare),
      duration: normalizeString(duration),
      spotlightText: normalizeString(spotlightText),
      imageUrl: normalizeString(imageUrl),
      isFeatured: Boolean(isFeatured)
    }
  });

  triggerRevalidate([finalSlug]);

  return actionSuccess("Услуга добавлена");
}

export async function updateService(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateServiceSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить услугу", parsed.error.flatten().fieldErrors);
  }

  const {
    id,
    categoryId,
    title,
    slug,
    excerpt,
    description,
    preparation,
    contraindications,
    aftercare,
    duration,
    spotlightText,
    imageUrl,
    isFeatured
  } = parsed.data;

  const existing = await prisma.service.findUnique({ where: { id }, select: { slug: true } });

  if (!existing) {
    return actionError("Услуга не найдена");
  }

  const finalSlug = slug && slug.length > 0 ? slug : slugify(title);

  await prisma.service.update({
    where: { id },
    data: {
      categoryId,
      title,
      slug: finalSlug,
      excerpt: normalizeString(excerpt) ?? null,
      description: normalizeString(description),
      preparation: normalizeString(preparation),
      contraindications: normalizeString(contraindications),
      aftercare: normalizeString(aftercare),
      duration: normalizeString(duration),
      spotlightText: normalizeString(spotlightText),
      imageUrl: normalizeString(imageUrl),
      isFeatured: Boolean(isFeatured)
    }
  });

  triggerRevalidate([existing.slug, finalSlug]);

  return actionSuccess("Услуга обновлена");
}

export async function deleteService(formData: FormData): Promise<ActionState> {
  "use server";

  const serviceId = formData.get("serviceId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(serviceId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор услуги");
  }

  const existing = await prisma.service.findUnique({ where: { id: parsedId.data }, select: { slug: true } });
  await prisma.service.delete({
    where: { id: parsedId.data }
  });

  triggerRevalidate(existing ? [existing.slug] : []);

  return actionSuccess("Услуга удалена");
}

export async function createPrice(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createPriceSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось добавить позицию", parsed.error.flatten().fieldErrors);
  }

  const { serviceId, title, amount, description, duration } = parsed.data;

  await prisma.price.create({
    data: {
      serviceId,
      title,
      amount: Math.round(amount),
      description: normalizeString(description),
      duration: normalizeString(duration)
    }
  });

  const service = await prisma.service.findUnique({ where: { id: serviceId }, select: { slug: true } });
  triggerRevalidate(service ? [service.slug] : []);

  return actionSuccess("Цена добавлена");
}

export async function updatePrice(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updatePriceSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить цену", parsed.error.flatten().fieldErrors);
  }

  const { id, serviceId, title, amount, description, duration } = parsed.data;

  await prisma.price.update({
    where: { id },
    data: {
      serviceId,
      title,
      amount: Math.round(amount),
      description: normalizeString(description),
      duration: normalizeString(duration)
    }
  });

  const service = await prisma.service.findUnique({ where: { id: serviceId }, select: { slug: true } });
  triggerRevalidate(service ? [service.slug] : []);

  return actionSuccess("Цена обновлена");
}

export async function deletePrice(formData: FormData): Promise<ActionState> {
  "use server";

  const priceId = formData.get("priceId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(priceId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор цены");
  }

  const price = await prisma.price.delete({
    where: { id: parsedId.data },
    select: { service: { select: { slug: true } } }
  });

  triggerRevalidate(price.service ? [price.service.slug] : []);

  return actionSuccess("Цена удалена");
}
