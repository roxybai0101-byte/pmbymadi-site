import { getPortfolio, getServiceCategories, getMediaLibrary } from "@/lib/data";
import { createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from "@/actions/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function AdminPortfolioPage() {
  const [items, categories, media] = await Promise.all([getPortfolio(), getServiceCategories(), getMediaLibrary()]);
  const serviceOptions = categories.flatMap((category) => category.services.map((service) => ({ id: service.id, title: service.title })));

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Добавить работу</h1>
        <form action={createPortfolioItem} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Название</Label>
            <Input name="title" required placeholder="Название кейса" />
          </div>
          <div>
            <Label>Порядок</Label>
            <Input name="order" type="number" min={0} defaultValue={items.length + 1} />
          </div>
          <div className="md:col-span-2">
            <Label>Описание</Label>
            <Textarea name="description" rows={3} placeholder="Краткое описание результата" />
          </div>
          <div>
            <Label>Изображение</Label>
            <select
              name="imageId"
              className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Выберите изображение</option>
              {media.map((file) => (
                <option key={file.id} value={file.id}>
                  {file.title ?? file.url}
                </option>
              ))}
            </select>
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
              Добавить
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">Список работ</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-4 rounded-[28px] border border-border/60 bg-white/90 p-5 shadow-soft">
              <form action={updatePortfolioItem} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={item.id} />
                <div>
                  <Label>Название</Label>
                  <Input name="title" defaultValue={item.title} />
                </div>
                <div>
                  <Label>Порядок</Label>
                  <Input name="order" type="number" defaultValue={item.order ?? 0} />
                </div>
                <div className="md:col-span-2">
                  <Label>Описание</Label>
                  <Textarea name="description" rows={3} defaultValue={item.description ?? ""} />
                </div>
                <div>
                  <Label>Изображение</Label>
                  <select
                    name="imageId"
                    defaultValue={item.image?.id ?? ""}
                    className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Без изображения</option>
                    {media.map((file) => (
                      <option key={file.id} value={file.id}>
                        {file.title ?? file.url}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Услуга</Label>
                  <select
                    name="serviceId"
                    defaultValue={item.serviceId ?? ""}
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
              <form action={deletePortfolioItem}>
                <input type="hidden" name="portfolioId" value={item.id} />
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
