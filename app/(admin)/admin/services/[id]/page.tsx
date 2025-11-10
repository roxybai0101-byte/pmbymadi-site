import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  updateServiceDetailsAction,
  createPriceAction,
  updatePriceAction,
  deletePriceAction
} from "@/app/(admin)/admin/services/[id]/actions";

type ServiceEditPageProps = {
  params: { id: string };
};

export default async function AdminServiceEditPage({ params }: ServiceEditPageProps) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      prices: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{service.category?.name}</p>
        <h1 className="font-serif text-3xl text-foreground">{service.title}</h1>
        <p className="text-sm text-muted-foreground">ID: {service.id}</p>
      </header>

      <Card className="border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Информация об услуге</CardTitle>
          <CardDescription>Обновите описание, подготовку, уход и противопоказания.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateServiceDetailsAction} className="space-y-4">
            <input name="id" type="hidden" value={service.id} />
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Название</label>
              <Input defaultValue={service.title} name="title" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Краткое описание</label>
              <Textarea defaultValue={service.excerpt ?? ""} name="excerpt" rows={3} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Полное описание</label>
              <Textarea defaultValue={service.description ?? ""} name="description" rows={5} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Подготовка</label>
                <Textarea defaultValue={service.preparation ?? ""} name="preparation" rows={4} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Уход</label>
                <Textarea defaultValue={service.aftercare ?? ""} name="aftercare" rows={4} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Противопоказания</label>
              <Textarea defaultValue={service.contraindications ?? ""} name="contraindications" rows={4} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Длительность</label>
              <Input defaultValue={service.duration ?? ""} name="duration" placeholder="Например, 2 часа" />
            </div>
            <Button type="submit">Сохранить изменения</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/70">
        <CardHeader>
          <CardTitle>Стоимость</CardTitle>
          <CardDescription>Добавьте варианты процедур, коррекции или обслуживание.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {service.prices.length ? (
            <div className="space-y-4">
              {service.prices.map((price) => (
                <form key={price.id} action={updatePriceAction} className="space-y-3 rounded-2xl border border-border/60 bg-background/70 p-4">
                  <input name="id" type="hidden" value={price.id} />
                  <input name="serviceId" type="hidden" value={service.id} />
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Название</label>
                      <Input defaultValue={price.name} name="name" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Стоимость</label>
                      <Input defaultValue={price.amount ?? ""} name="amount" placeholder="Например, 9500" type="number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Комментарий</label>
                    <Textarea defaultValue={price.description ?? ""} name="description" rows={2} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" type="submit">
                      Сохранить
                    </Button>
                    <Button formAction={deletePriceAction} formMethod="post" size="sm" variant="outline">
                      Удалить
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {price.amount ? `на сайте: ${formatCurrency(price.amount)}` : "Цена скрыта — «по запросу»"}
                    </span>
                  </div>
                </form>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Цены пока не добавлены.</p>
          )}

          <div className="rounded-2xl border border-dashed border-border/60 p-4">
            <h3 className="text-sm font-semibold text-foreground">Добавить цену</h3>
            <form action={createPriceAction} className="mt-3 grid gap-3 md:grid-cols-2">
              <input name="serviceId" type="hidden" value={service.id} />
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Название</label>
                <Input name="name" placeholder="Например, Основная процедура" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Стоимость</label>
                <Input name="amount" placeholder="11000" type="number" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-foreground">Комментарий</label>
                <Textarea name="description" placeholder="Дополнительная информация" rows={3} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Добавить</Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
