import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { idSchema, reviewSchema } from "@/lib/validators";
import { actionError, actionSuccess, type ActionState } from "@/actions/shared";

const createSchema = reviewSchema.omit({ id: true });
const updateSchema = reviewSchema.extend({ id: idSchema });

function normalize(value?: string | null) {
  if (!value || value.trim().length === 0) return null;
  return value.trim();
}

function revalidate(serviceSlug?: string | null) {
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  if (serviceSlug) {
    revalidatePath(`/services/${serviceSlug}`);
  }
}

export async function createReview(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось добавить отзыв", parsed.error.flatten().fieldErrors);
  }

  const { name, rating, content, source, serviceId } = parsed.data;

  const review = await prisma.review.create({
    data: {
      name,
      rating: Math.min(Math.max(rating, 1), 5),
      content,
      source: normalize(source),
      serviceId: serviceId && serviceId !== "" ? serviceId : null
    },
    select: {
      service: { select: { slug: true } }
    }
  });

  revalidate(review.service?.slug);

  return actionSuccess("Отзыв добавлен");
}

export async function updateReview(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  "use server";

  const payload = Object.fromEntries(formData.entries());
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return actionError("Не удалось обновить отзыв", parsed.error.flatten().fieldErrors);
  }

  const { id, name, rating, content, source, serviceId } = parsed.data;

  const review = await prisma.review.update({
    where: { id },
    data: {
      name,
      rating: Math.min(Math.max(rating, 1), 5),
      content,
      source: normalize(source),
      serviceId: serviceId && serviceId !== "" ? serviceId : null
    },
    select: {
      service: { select: { slug: true } }
    }
  });

  revalidate(review.service?.slug);

  return actionSuccess("Отзыв обновлён");
}

export async function deleteReview(formData: FormData): Promise<ActionState> {
  "use server";

  const reviewId = formData.get("reviewId")?.toString() ?? "";
  const parsedId = idSchema.safeParse(reviewId);
  if (!parsedId.success) {
    return actionError("Некорректный идентификатор");
  }

  const review = await prisma.review.delete({
    where: { id: parsedId.data },
    select: {
      service: { select: { slug: true } }
    }
  });

  revalidate(review.service?.slug);

  return actionSuccess("Отзыв удалён");
}
