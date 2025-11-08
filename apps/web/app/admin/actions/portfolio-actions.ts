"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "../../../lib/prisma";
import { cloudinary, getCloudinaryFolder } from "../../../lib/cloudinary";
import { fileToBuffer } from "../../../lib/file";

const portfolioSchema = z.object({
  id: z.string().optional(),
  titleRu: z.string().min(2),
  titleEn: z.string().min(2),
  altRu: z.string().min(2),
  altEn: z.string().min(2),
  tag: z.enum(["BROWS", "LIPS", "EYELIDS", "REMOVAL"]),
  serviceId: z.string().optional().nullable(),
  order: z.number().int().optional(),
  published: z.boolean().optional()
});

async function uploadToCloudinary(file: File) {
  if (!cloudinary.config().cloud_name) {
    throw new Error("Cloudinary not configured");
  }

  const buffer = await fileToBuffer(file);

  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: getCloudinaryFolder(),
        transformation: [{ quality: "auto", fetch_format: "webp" }]
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
        } else {
          resolve({ secure_url: result.secure_url, public_id: result.public_id });
        }
      }
    );
    stream.end(buffer);
  });
}

function parse(formData: FormData) {
  const data = portfolioSchema.parse({
    id: formData.get("id")?.toString(),
    titleRu: formData.get("title_ru")?.toString() ?? "",
    titleEn: formData.get("title_en")?.toString() ?? "",
    altRu: formData.get("alt_ru")?.toString() ?? "",
    altEn: formData.get("alt_en")?.toString() ?? "",
    tag: formData.get("tag")?.toString(),
    serviceId: formData.get("service_id")?.toString() || undefined,
    order: formData.get("order") ? Number(formData.get("order")) : undefined,
    published: formData.get("published") === "on" || formData.get("published") === "true"
  });
  return data;
}

function revalidate() {
  revalidatePath("/ru/portfolio");
  revalidatePath("/en/portfolio");
  revalidatePath("/ru");
  revalidatePath("/en");
  revalidatePath("/admin/portfolio");
}

export async function createPortfolioItem(formData: FormData) {
  const data = parse(formData);
  const file = formData.get("image") as File | null;

  if (!file || file.size === 0) {
    throw new Error("Image is required");
  }

  const upload = await uploadToCloudinary(file);

  await prisma.portfolioItem.create({
    data: {
      title: { ru: data.titleRu, en: data.titleEn },
      alt: { ru: data.altRu, en: data.altEn },
      imageUrl: upload.secure_url,
      publicId: upload.public_id,
      tag: data.tag,
      order: data.order ?? 0,
      published: data.published ?? false,
      serviceId: data.serviceId ?? undefined
    }
  });

  revalidate();
}

export async function updatePortfolioItem(formData: FormData) {
  const data = parse(formData);
  if (!data.id) {
    throw new Error("Portfolio ID required");
  }
  const file = formData.get("image") as File | null;

  let imageUrl: string | undefined;
  let publicId: string | undefined;

  if (file && file.size > 0) {
    const upload = await uploadToCloudinary(file);
    imageUrl = upload.secure_url;
    publicId = upload.public_id;
  }

  await prisma.portfolioItem.update({
    where: { id: data.id },
    data: {
      title: { ru: data.titleRu, en: data.titleEn },
      alt: { ru: data.altRu, en: data.altEn },
      tag: data.tag,
      order: data.order ?? 0,
      serviceId: data.serviceId ?? undefined,
      published: data.published ?? false,
      ...(imageUrl && publicId ? { imageUrl, publicId } : {})
    }
  });

  revalidate();
}

export async function deletePortfolioItem(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    throw new Error("Portfolio ID required");
  }
  const item = await prisma.portfolioItem.delete({ where: { id } });
  if (item.publicId && cloudinary.config().cloud_name) {
    await cloudinary.uploader.destroy(item.publicId);
  }
  revalidate();
}

export async function togglePortfolioPublish(formData: FormData) {
  const id = formData.get("id")?.toString();
  const published = formData.get("published") === "true";
  if (!id) {
    throw new Error("Portfolio ID required");
  }

  await prisma.portfolioItem.update({
    where: { id },
    data: { published }
  });

  revalidate();
}
