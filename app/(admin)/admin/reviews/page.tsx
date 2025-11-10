import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  createReviewAction,
  updateReviewAction,
  deleteReviewAction
} from "@/app/(admin)/admin/reviews/actions";

export default async function AdminReviewsPage() {
  const [reviews, services] = await Promise.all([
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        service: true
      }
    }),
    prisma.service.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true }
    })
  ]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Отзывы</h1>
        <p className="text-sm text-muted-foreground">
          Модерируйте отзывы клиентов и выбирайте, какие показывать на сайте.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle>{review.author}</CardTitle>
                <CardDescription>
                  Оценка: {review.rating} · {review.service ? review.service.title : "Без привязки"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateReviewAction} className="space-y-3">
                  <input name="id" type="hidden" value={review.id} />
                  <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,0.5fr)_minmax(0,1fr)]">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Имя</label>
                      <Input defaultValue={review.author} name="author" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Оценка</label>
                      <Input defaultValue={review.rating} max={5} min={1} name="rating" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Услуга</label>
                      <select
                        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        defaultValue={review.serviceId ?? ""}
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
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Текст отзыва</label>
                    <Textarea defaultValue={review.content} name="content" rows={4} required />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" type="submit">
                      Сохранить
                    </Button>
                    <Button formAction={deleteReviewAction} formMethod="post" size="sm" variant="outline">
                      Удалить
                    </Button>
                    <span className="text-xs text-muted-foreground">ID: {review.id}</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Добавить отзыв</CardTitle>
            <CardDescription>Внесите текст от клиента и при необходимости привяжите к услуге.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createReviewAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Имя клиента</label>
                <Input name="author" placeholder="Имя" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Оценка</label>
                  <Input defaultValue={5} max={5} min={1} name="rating" type="number" />
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
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Отзыв</label>
                <Textarea name="content" placeholder="Текст отзыва" rows={4} required />
              </div>
              <Button className="w-full" type="submit">
                Добавить отзыв
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
