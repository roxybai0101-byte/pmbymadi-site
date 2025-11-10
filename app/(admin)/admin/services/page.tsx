import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { createServiceAction, deleteServiceAction } from "@/app/(admin)/admin/services/actions";

export default async function AdminServicesPage() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        orderBy: { order: "asc" },
        include: {
          prices: {
            orderBy: { order: "asc" }
          }
        }
      }
    }
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Услуги</h1>
        <p className="text-sm text-muted-foreground">Создавайте новые процедуры, редактируйте описание и стоимость.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          {categories.map((category) => (
            <Card key={category.id} className="border-border/60 bg-card/70">
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{category.name}</CardTitle>
                  {category.description ? (
                    <CardDescription>{category.description}</CardDescription>
                  ) : null}
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/services/categories/${category.id}`}>Изменить категорию</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.services.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Пока нет услуг в этой категории.</p>
                ) : (
                  <div className="space-y-3">
                    {category.services.map((service) => {
                      const basePrice = service.prices.at(0);
                      return (
                        <div
                          key={service.id}
                          className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
                              <Badge variant="subtle">{category.name}</Badge>
                              {service.duration ? (
                                <Badge variant="outline">{service.duration}</Badge>
                              ) : null}
                            </div>
                            {service.excerpt ? (
                              <p className="text-sm text-muted-foreground">{service.excerpt}</p>
                            ) : null}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span>Цен: {service.prices.length}</span>
                              {basePrice?.amount ? (
                                <span>от {formatCurrency(basePrice.amount)}</span>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button asChild size="sm" variant="secondary">
                              <Link href={`/admin/services/${service.id}`}>Редактировать</Link>
                            </Button>
                            <form action={deleteServiceAction}>
                              <input name="id" type="hidden" value={service.id} />
                              <Button size="sm" type="submit" variant="outline">
                                Удалить
                              </Button>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Добавить услугу</CardTitle>
            <CardDescription>
              Создайте новую процедуру. Позже можно дополнить описание и цены на отдельной странице.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createServiceAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Категория</label>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  name="categoryId"
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Название</label>
                <Input name="title" placeholder="Например, Пудровые брови" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Описание (кратко)</label>
                <Textarea name="excerpt" placeholder="Короткий текст для списка услуг" rows={3} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Базовая стоимость</label>
                  <Input name="basePrice" placeholder="например, 9500" type="number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Длительность</label>
                  <Input name="duration" placeholder="Например, 2 часа" />
                </div>
              </div>
              <Button className="w-full" type="submit">
                Создать услугу
              </Button>
            </form>
            <div className="mt-6 rounded-xl border border-border/60 bg-background/60 p-4 text-xs text-muted-foreground">
              <p>
                Для расширенного редактирования (подготовка, уход, цены, портфолио) откройте страницу редактирования
                услуги после создания.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
