import { getServiceCategories } from "@/lib/data";
import {
  createCategory,
  deleteCategory,
  updateCategory
} from "@/actions/categories";
import {
  createPrice,
  createService,
  deletePrice,
  deleteService,
  updatePrice,
  updateService
} from "@/actions/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function AdminServicesPage() {
  const categories = await getServiceCategories();

  return (
    <div className="space-y-10">
      <section className="space-y-6 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Категории услуг</h1>
        <form action={createCategory} className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Label htmlFor="category-name">Название</Label>
            <Input id="category-name" name="name" required placeholder="Напр., Брови" />
          </div>
          <div>
            <Label htmlFor="category-order">Порядок</Label>
            <Input id="category-order" name="order" type="number" min={0} defaultValue={categories.length + 1} />
          </div>
          <div className="md:col-span-4">
            <Label htmlFor="category-description">Описание</Label>
            <Textarea id="category-description" name="description" rows={3} placeholder="Кратко опишите категорию" />
          </div>
          <div className="md:col-span-4">
            <Button type="submit" className="rounded-xl">
              Добавить категорию
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="rounded-[28px] border border-border/50 bg-background/70 p-5">
              <div className="grid gap-4 md:grid-cols-6">
                <form action={updateCategory} className="grid gap-4 md:grid-cols-6">
                  <input type="hidden" name="id" value={category.id} />
                  <div className="md:col-span-2">
                    <Label>Название</Label>
                    <Input name="name" defaultValue={category.name} />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input name="slug" placeholder="автоматически" defaultValue={category.slug} />
                  </div>
                  <div>
                    <Label>Порядок</Label>
                    <Input name="order" type="number" defaultValue={category.order ?? 0} />
                  </div>
                  <div className="md:col-span-6">
                    <Label>Описание</Label>
                    <Textarea name="description" rows={2} defaultValue={category.description ?? ""} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="submit" className="rounded-xl">
                      Сохранить
                    </Button>
                  </div>
                </form>
                <form action={deleteCategory} className="md:col-span-6">
                  <input type="hidden" name="categoryId" value={category.id} />
                  <Button variant="outline" type="submit" className="rounded-xl">
                    Удалить категорию
                  </Button>
                </form>
              </div>

              <div className="mt-6 space-y-4 rounded-3xl border border-border/60 bg-white/80 p-5">
                <details open>
                  <summary className="cursor-pointer text-sm font-semibold text-foreground">Создать услугу</summary>
                  <form action={createService} className="mt-4 grid gap-4 md:grid-cols-2">
                    <input type="hidden" name="categoryId" value={category.id} />
                    <div>
                      <Label>Название</Label>
                      <Input name="title" required placeholder="Название услуги" />
                    </div>
                    <div>
                      <Label>Slug</Label>
                      <Input name="slug" placeholder="авто" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Краткое описание</Label>
                      <Textarea name="excerpt" rows={2} placeholder="Что получит клиент" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Описание</Label>
                      <Textarea name="description" rows={4} placeholder="Расскажите подробнее об услуге" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Подготовка</Label>
                      <Textarea name="preparation" rows={3} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Противопоказания</Label>
                      <Textarea name="contraindications" rows={3} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Уход</Label>
                      <Textarea name="aftercare" rows={3} />
                    </div>
                    <div>
                      <Label>Продолжительность</Label>
                      <Input name="duration" placeholder="Напр., 2 часа" />
                    </div>
                    <div>
                      <Label>Акцент</Label>
                      <Input name="spotlightText" placeholder="Особенность услуги" />
                    </div>
                    <div>
                      <Label>Изображение (URL)</Label>
                      <Input name="imageUrl" placeholder="/uploads/... или /portfolio-01.JPG" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`featured-${category.id}`} name="isFeatured" value="true" />
                      <Label htmlFor={`featured-${category.id}`} className="text-sm text-muted-foreground">
                        Показывать на главной
                      </Label>
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit" className="rounded-xl">
                        Создать услугу
                      </Button>
                    </div>
                  </form>
                </details>

                <div className="space-y-4">
                  {category.services.map((service) => (
                      <div key={service.id} className="space-y-4 rounded-3xl border border-border/60 bg-background/60 p-5">
                        <div className="space-y-3">
                          <form action={updateService} className="grid gap-4 md:grid-cols-2">
                            <input type="hidden" name="id" value={service.id} />
                            <input type="hidden" name="categoryId" value={category.id} />
                            <div>
                              <Label>Название</Label>
                              <Input name="title" defaultValue={service.title} />
                            </div>
                            <div>
                              <Label>Slug</Label>
                              <Input name="slug" defaultValue={service.slug} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Краткое описание</Label>
                              <Textarea name="excerpt" rows={2} defaultValue={service.excerpt ?? ""} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Описание</Label>
                              <Textarea name="description" rows={3} defaultValue={service.description ?? ""} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Подготовка</Label>
                              <Textarea name="preparation" rows={2} defaultValue={service.preparation ?? ""} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Противопоказания</Label>
                              <Textarea name="contraindications" rows={2} defaultValue={service.contraindications ?? ""} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Уход</Label>
                              <Textarea name="aftercare" rows={2} defaultValue={service.aftercare ?? ""} />
                            </div>
                            <div>
                              <Label>Продолжительность</Label>
                              <Input name="duration" defaultValue={service.duration ?? ""} />
                            </div>
                            <div>
                              <Label>Особенность</Label>
                              <Input name="spotlightText" defaultValue={service.spotlightText ?? ""} />
                            </div>
                            <div>
                              <Label>URL изображения</Label>
                              <Input name="imageUrl" defaultValue={service.imageUrl ?? ""} />
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`featured-service-${service.id}`}
                                name="isFeatured"
                                value="true"
                                defaultChecked={service.isFeatured}
                              />
                              <Label htmlFor={`featured-service-${service.id}`} className="text-sm text-muted-foreground">
                                На главной
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button type="submit" className="rounded-xl">
                                Сохранить услугу
                              </Button>
                            </div>
                        </form>
                        <form action={deleteService}>
                          <input type="hidden" name="serviceId" value={service.id} />
                          <Button type="submit" variant="outline" className="rounded-xl">
                            Удалить услугу
                          </Button>
                        </form>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-border/40 bg-white/70 p-4">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Цены</h3>
                        <form action={createPrice} className="grid gap-3 md:grid-cols-4">
                          <input type="hidden" name="serviceId" value={service.id} />
                          <div className="md:col-span-2">
                            <Input name="title" placeholder="Название позиции" required />
                          </div>
                          <div>
                            <Input name="amount" type="number" min={0} placeholder="Стоимость" required />
                          </div>
                          <div className="md:col-span-4">
                            <Input name="description" placeholder="Комментарий (опционально)" />
                          </div>
                          <div className="md:col-span-4">
                            <Input name="duration" placeholder="Длительность (опционально)" />
                          </div>
                          <div className="md:col-span-4">
                            <Button type="submit" size="sm" variant="outline" className="rounded-xl">
                              Добавить цену
                            </Button>
                          </div>
                        </form>

                        <div className="space-y-2">
                          {service.prices.map((price) => (
                            <div key={price.id} className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-background/80 p-3 md:flex-row md:items-center md:justify-between">
                              <form action={updatePrice} className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-4">
                                <input type="hidden" name="id" value={price.id} />
                                <input type="hidden" name="serviceId" value={service.id} />
                                <Input name="title" defaultValue={price.title} className="md:w-44" />
                                <Input name="amount" type="number" defaultValue={price.amount} className="md:w-32" />
                                <Input name="description" defaultValue={price.description ?? ""} placeholder="Описание" className="md:flex-1" />
                                <Input name="duration" defaultValue={price.duration ?? ""} placeholder="Длительность" className="md:w-32" />
                                <Button type="submit" size="sm" className="rounded-lg">
                                  Обновить
                                </Button>
                              </form>
                              <form action={deletePrice}>
                                <input type="hidden" name="priceId" value={price.id} />
                                <Button type="submit" variant="outline" size="sm" className="rounded-lg">
                                  Удалить
                                </Button>
                              </form>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
