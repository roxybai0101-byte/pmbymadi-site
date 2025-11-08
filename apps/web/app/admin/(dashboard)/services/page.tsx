import { prisma } from "../../../../lib/prisma";
import { createService, updateService, deleteService, toggleServicePublish } from "../../actions/service-actions";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea, SectionDescription } from "@pmby/ui";

export const metadata = {
  title: "Услуги — PM BY MADI Admin"
};

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" }
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-serif text-brand-chocolate">Услуги</h1>
        <p className="mt-2 text-sm text-brand-cocoa/70">Управляйте карточками услуг студии.</p>
      </div>

      <div className="space-y-8">
        {services.map((service) => {
          const title = service.title as Record<string, string>;
          const description = service.description as Record<string, string>;
          const seoTitle = (service.seoTitle ?? {}) as Record<string, string>;
          const seoDescription = (service.seoDescription ?? {}) as Record<string, string>;
          return (
            <Card key={service.id} className="bg-white/95">
              <CardHeader className="flex flex-col gap-2">
                <CardTitle>{title.ru}</CardTitle>
                <SectionDescription>Slug: {service.slug}</SectionDescription>
              </CardHeader>
              <CardContent>
                <form action={updateService} className="grid gap-6 md:grid-cols-2">
                  <input type="hidden" name="id" value={service.id} />
                  <div className="space-y-2">
                    <Label htmlFor={`title_ru_${service.id}`}>Заголовок (RU)</Label>
                    <Input id={`title_ru_${service.id}`} name="title_ru" defaultValue={title.ru} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`title_en_${service.id}`}>Title (EN)</Label>
                    <Input id={`title_en_${service.id}`} name="title_en" defaultValue={title.en} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description_ru_${service.id}`}>Описание (RU)</Label>
                    <Textarea
                      id={`description_ru_${service.id}`}
                      name="description_ru"
                      rows={3}
                      defaultValue={description.ru}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`description_en_${service.id}`}>Description (EN)</Label>
                    <Textarea
                      id={`description_en_${service.id}`}
                      name="description_en"
                      rows={3}
                      defaultValue={description.en}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`slug_${service.id}`}>Slug</Label>
                    <Input id={`slug_${service.id}`} name="slug" defaultValue={service.slug} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`duration_${service.id}`}>Длительность</Label>
                    <Input id={`duration_${service.id}`} name="duration" defaultValue={service.duration ?? ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`price_${service.id}`}>Стоимость (€)</Label>
                    <Input
                      id={`price_${service.id}`}
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={service.price ? (service.price / 100).toFixed(2) : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`order_${service.id}`}>Порядок</Label>
                    <Input
                      id={`order_${service.id}`}
                      name="order"
                      type="number"
                      defaultValue={service.order}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`seo_title_ru_${service.id}`}>SEO Title (RU)</Label>
                    <Input
                      id={`seo_title_ru_${service.id}`}
                      name="seo_title_ru"
                      defaultValue={seoTitle.ru ?? ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`seo_title_en_${service.id}`}>SEO Title (EN)</Label>
                    <Input
                      id={`seo_title_en_${service.id}`}
                      name="seo_title_en"
                      defaultValue={seoTitle.en ?? ""}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`seo_description_ru_${service.id}`}>SEO Description (RU)</Label>
                    <Textarea
                      id={`seo_description_ru_${service.id}`}
                      name="seo_description_ru"
                      rows={2}
                      defaultValue={seoDescription.ru ?? ""}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`seo_description_en_${service.id}`}>SEO Description (EN)</Label>
                    <Textarea
                      id={`seo_description_en_${service.id}`}
                      name="seo_description_en"
                      rows={2}
                      defaultValue={seoDescription.en ?? ""}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`published_${service.id}`}
                      name="published"
                      defaultChecked={service.published}
                    />
                    <Label htmlFor={`published_${service.id}`}>Опубликовано</Label>
                  </div>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <Button type="submit">Сохранить</Button>
                    <Button formAction={deleteService} variant="outline">
                      Удалить
                    </Button>
                    <Button
                      formAction={toggleServicePublish}
                      formMethod="post"
                      variant="soft"
                      name="published"
                      value={(!service.published).toString()}
                    >
                      {service.published ? "В черновик" : "Опубликовать"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-white/95">
        <CardHeader>
          <CardTitle>Добавить услугу</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createService} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new_title_ru">Заголовок (RU)</Label>
              <Input id="new_title_ru" name="title_ru" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_title_en">Title (EN)</Label>
              <Input id="new_title_en" name="title_en" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new_description_ru">Описание (RU)</Label>
              <Textarea id="new_description_ru" name="description_ru" rows={3} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new_description_en">Description (EN)</Label>
              <Textarea id="new_description_en" name="description_en" rows={3} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_slug">Slug</Label>
              <Input id="new_slug" name="slug" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_duration">Длительность</Label>
              <Input id="new_duration" name="duration" placeholder="2 часа" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_price">Стоимость (€)</Label>
              <Input id="new_price" name="price" type="number" step="0.01" placeholder="320.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_order">Порядок</Label>
              <Input id="new_order" name="order" type="number" defaultValue={services.length + 1} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new_published">
                <input type="checkbox" id="new_published" name="published" className="mr-2" />
                Сразу опубликовать
              </Label>
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Создать услугу</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
