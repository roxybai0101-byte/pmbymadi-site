import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadForm } from "@/components/media/upload-form";
import { deleteMediaAction } from "@/app/(admin)/admin/media/actions";

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 60
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Медиафайлы</h1>
        <p className="text-sm text-muted-foreground">
          Загружайте изображения для портфолио, блога и сайта. Ограничение — 6 МБ на файл.
        </p>
      </header>

      <UploadForm />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {media.map((file) => (
          <Card key={file.id} className="border-border/60 bg-card/70">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-base">{file.filename}</CardTitle>
              <CardDescription>{file.mimeType}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-48 overflow-hidden rounded-2xl border border-border/60 bg-background/70">
                <Image alt={file.filename} fill sizes="300px" src={file.url} className="object-cover" />
              </div>
              <div className="text-xs text-muted-foreground">
                <p>ID: {file.id}</p>
                <p>URL: {file.url}</p>
                <p>Размер: {file.size ? `${(file.size / 1024).toFixed(1)} КБ` : "—"}</p>
              </div>
              <form action={deleteMediaAction} className="flex items-center justify-between">
                <input name="id" type="hidden" value={file.id} />
                <input name="url" type="hidden" value={file.url} />
                <Button size="sm" type="submit" variant="outline">
                  Удалить
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <a href={file.url} rel="noreferrer" target="_blank">
                    Открыть
                  </a>
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
