import Image from "next/image";
import { getMediaLibrary } from "@/lib/data";
import { deleteMedia } from "@/actions/media";
import { MediaUploader } from "@/components/admin/media-uploader";
import { Button } from "@/components/ui/button";

export default async function AdminMediaPage() {
  const media = await getMediaLibrary();

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Загрузка медиа</h1>
        <p className="mt-2 text-sm text-muted-foreground">Файлы сохраняются в /public/uploads/yyyy/mm.</p>
        <MediaUploader />
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">Галерея</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {media.map((item) => (
            <div key={item.id} className="space-y-3 rounded-[24px] border border-border/60 bg-white/90 p-4 shadow-soft">
              <div className="overflow-hidden rounded-2xl border border-border/40 bg-background">
                <Image
                  src={item.url}
                  alt={item.alt ?? item.title ?? "media"}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="text-sm font-semibold text-foreground">{item.title ?? "Без названия"}</div>
              <div className="text-xs text-muted-foreground break-all">{item.url}</div>
              <div className="text-xs text-muted-foreground">
                {item.size ? `${Math.round(item.size / 1024)} КБ` : null} · {item.mimeType ?? "неизвестно"}
              </div>
              <form action={deleteMedia}>
                <input type="hidden" name="mediaId" value={item.id} />
                <Button variant="outline" type="submit" size="sm" className="rounded-xl">
                  Удалить
                </Button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
