import { NextResponse } from "next/server";
import { z } from "zod";
import { SubmissionType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const submissionSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  contact: z.string().min(3, "Укажите телефон или контакт для связи"),
  service: z.string().optional(),
  message: z.string().optional(),
  type: z.nativeEnum(SubmissionType).default(SubmissionType.BOOKING)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = submissionSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Некорректные данные",
        issues: parsed.error.flatten()
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  await prisma.submission.create({
    data: {
      name: data.name,
      contact: data.contact,
      service: data.service,
      message: data.message,
      type: data.type,
      meta: {
        userAgent: request.headers.get("user-agent"),
        referer: request.headers.get("referer")
      }
    }
  });

  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Не авторизовано" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as SubmissionType | null;
  const allowedTypes = Object.values(SubmissionType);

  const where = type && allowedTypes.includes(type) ? { type } : undefined;

  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ submissions });
}
