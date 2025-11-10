"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SubmissionStatus } from "@prisma/client";

const updateSubmissionSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(SubmissionStatus)
});

export async function updateSubmissionStatusAction(formData: FormData) {
  const parsed = updateSubmissionSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status")
  });

  if (!parsed.success) {
    throw new Error("Не удалось обновить заявку");
  }

  const data = parsed.data;

  await prisma.submission.update({
    where: { id: data.id },
    data: { status: data.status }
  });

  revalidatePath("/admin/submissions");
}
