import { getReviews, getServiceCategories } from "@/lib/data";
import { createReview, updateReview, deleteReview } from "@/actions/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function AdminReviewsPage() {
  const [reviews, categories] = await Promise.all([getReviews(), getServiceCategories()]);
  const serviceOptions = categories.flatMap((category) => category.services.map((service) => ({ id: service.id, title: service.title })));

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Добавить отзыв</h1>
        <form action={createReview} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Имя</Label>
            <Input name="name" required placeholder="Имя клиента" />
          </div>
          <div>
            <Label>Оценка</Label>
            <Input name="rating" type="number" min={1} max={5} defaultValue={5} />
          </div>
          <div className="md:col-span-2">
            <Label>Текст отзыва</Label>
            <Textarea name="content" rows={4} required placeholder="Текст отзыва" />
          </div>
          <div>
            <Label>Источник (опционально)</Label>
            <Input name="source" placeholder="Instagram, WhatsApp..." />
          </div>
          <div>
            <Label>Услуга</Label>
            <select
              name="serviceId"
              className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Без привязки</option>
              {serviceOptions.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Добавить отзыв
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">Отзывы</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-4 rounded-[28px] border border-border/60 bg-white/90 p-5 shadow-soft">
              <form action={updateReview} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={review.id} />
                <div>
                  <Label>Имя</Label>
                  <Input name="name" defaultValue={review.name} />
                </div>
                <div>
                  <Label>Оценка</Label>
                  <Input name="rating" type="number" min={1} max={5} defaultValue={review.rating} />
                </div>
                <div className="md:col-span-2">
                  <Label>Текст отзыва</Label>
                  <Textarea name="content" rows={4} defaultValue={review.content} />
                </div>
                <div>
                  <Label>Источник</Label>
                  <Input name="source" defaultValue={review.source ?? ""} />
                </div>
                <div>
                  <Label>Услуга</Label>
                  <select
                    name="serviceId"
                    defaultValue={review.serviceId ?? ""}
                    className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Без привязки</option>
                    {serviceOptions.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <Button type="submit" className="rounded-xl">
                    Сохранить
                  </Button>
                </div>
              </form>
              <form action={deleteReview}>
                <input type="hidden" name="reviewId" value={review.id} />
                <Button variant="outline" type="submit" className="rounded-xl">
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
