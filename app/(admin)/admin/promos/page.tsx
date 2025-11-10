import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  createPromoAction,
  updatePromoAction,
  deletePromoAction
} from "@/app/(admin)/admin/promos/actions";

export default async function AdminPromosPage() {
  const promos = await prisma.promo.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Акции</h1>
        <p className="text-sm text-muted-foreground">
          Управляйте специальными предложениями: задавайте сроки, описание и SEO-настройки.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {promos.map((promo) => (
            <Card key={promo.id} className="border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle>{promo.title}</CardTitle>
                <CardDescription>
                  {promo.isActive ? "Активна" : "Неактивна"} · {promo.startsAt ? `с ${promo.startsAt.toLocaleDateString()}` : "без даты"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updatePromoAction} className="space-y-3">
                  <input name="id" type="hidden" value={promo.id} />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Заголовок</label>
                    <Input defaultValue={promo.title} name="title" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Короткое описание</label>
                    <Textarea defaultValue={promo.excerpt ?? ""} name="excerpt" rows={2} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Полное описание</label>
                    <Textarea defaultValue={promo.body ?? ""} name="body" rows={4} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Дата начала</label>
                      <Input defaultValue={promo.startsAt?.toISOString().substring(0, 10)} name="startsAt" type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Дата окончания</label>
                      <Input defaultValue={promo.endsAt?.toISOString().substring(0, 10)} name="endsAt" type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Статус</label>
                      <select
                        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        defaultValue={promo.isActive ? "true" : "false"}
                        name="isActive"
                      >
                        <option value="true">Активна</option>
                        <option value="false">Неактивна</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">SEO заголовок</label>
                      <Input defaultValue={promo.seoTitle ?? ""} name="seoTitle" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">SEO описание</label>
                      <Input defaultValue={promo.seoDescription ?? ""} name="seoDescription" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" type="submit">
                      Сохранить
                    </Button>
                    <Button formAction={deletePromoAction} formMethod="post" size="sm" variant="outline">
                      Удалить
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Добавить акцию</CardTitle>
            <CardDescription>Заполните данные новой акции. Она появится на сайте сразу после сохранения.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createPromoAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Заголовок</label>
                <Input name="title" placeholder="Например, -15% на коррекцию" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Короткое описание</label>
                <Textarea name="excerpt" rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Полное описание</label>
                <Textarea name="body" rows={4} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Дата начала</label>
                  <Input name="startsAt" type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Дата окончания</label>
                  <Input name="endsAt" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Статус</label>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue="true"
                  name="isActive"
                >
                  <option value="true">Активна</option>
                  <option value="false">Неактивна</option>
                </select>
              </div>
              <Button className="w-full" type="submit">
                Создать акцию
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
