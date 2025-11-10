import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  createPortfolioItemAction,
  updatePortfolioItemAction,
  deletePortfolioItemAction
} from "@/app/(admin)/admin/portfolio/actions";

export default async function AdminPortfolioPage() {
  const [items, services, media] = await Promise.all([
    prisma.portfolioItem.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        service: true,
        coverImage: true
      }
    }),
    prisma.service.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true }
    }),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      take: 30
    })
  ]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Портфолио</h1>
        <p className="text-sm text-muted-foreground">
          Добавляйте свежие работы, отмечайте связанные услуги и выделяйте лучшие кадры.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border-border/60 bg-card/70">
              <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  {item.service ? <CardDescription>{item.service.title}</CardDescription> : null}
                </div>
                <Badge variant="outline">{item.tags.join(", ") || "Без тегов"}</Badge>
              </CardHeader>
              <CardContent className="grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <form action={updatePortfolioItemAction} className="space-y-3">
                  <input name="id" type="hidden" value={item.id} />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Заголовок</label>
                    <Input defaultValue={item.title} name="title" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Описание</label>
                    <Textarea defaultValue={item.description ?? ""} name="description" rows={3} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Услуга</label>
                      <select
                        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        defaultValue={item.serviceId ?? ""}
                        name="serviceId"
                      >
                        <option value="">Не указано</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Изображение</label>
                      <select
                        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        defaultValue={item.coverImageId ?? ""}
                        name="coverImageId"
                      >
                        <option value="">Без изображения</option>
                        {media.map((image) => (
                          <option key={image.id} value={image.id}>
                            {image.filename}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Теги (через запятую)</label>
                    <Input defaultValue={item.tags.join(", ")} name="tags" placeholder="брови, натурально" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" type="submit">
                      Сохранить
                    </Button>
                    <Button formAction={deletePortfolioItemAction} formMethod="post" size="sm" variant="outline">
                      Удалить
                    </Button>
                  </div>
                </form>
                <div className="space-y-3">
                  <div className="relative h-40 overflow-hidden rounded-2xl border border-border/60 bg-background/70">
                    {item.coverImage ? (
                      <Image alt={item.title} fill sizes="200px" src={item.coverImage.url} className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        Изображение не выбрано
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ID: {item.id} · Слаг: <code>{item.slug}</code>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Добавить работу</CardTitle>
            <CardDescription>Заполните информацию, чтобы работа отобразилась на сайте.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createPortfolioItemAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Заголовок</label>
                <Input name="title" placeholder="Например, Пудровые брови «до/после»" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Описание</label>
                <Textarea name="description" rows={3} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Услуга</label>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  name="serviceId"
                >
                  <option value="">Не указано</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Изображение</label>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  name="coverImageId"
                >
                  <option value="">Не выбрано</option>
                  {media.map((image) => (
                    <option key={image.id} value={image.id}>
                      {image.filename}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Теги</label>
                <Input name="tags" placeholder="Например, брови, натурально" />
              </div>
              <Button className="w-full" type="submit">
                Добавить работу
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              Чтобы загрузить новое фото, перейдите в раздел «Медиа» и добавьте изображение. После этого выберите его в списке.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
