import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/app/(admin)/admin/services/categories/actions";

export default async function AdminServiceCategoriesPage() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: {
        select: { services: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Категории услуг</h1>
        <p className="text-sm text-muted-foreground">
          Группируйте процедуры по направлениям, чтобы на сайте и в админке было удобнее ориентироваться.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {categories.map((category) => (
            <Card key={category.id} className="border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>Услуг: {category._count.services}</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateCategoryAction} className="space-y-4">
                  <input name="id" type="hidden" value={category.id} />
                  <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Название</label>
                      <Input defaultValue={category.name} name="name" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Порядок</label>
                      <Input defaultValue={category.order} name="order" type="number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Описание (опционально)</label>
                    <Textarea defaultValue={category.description ?? ""} name="description" rows={3} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" type="submit">
                      Сохранить
                    </Button>
                    <Button formAction={deleteCategoryAction} formMethod="post" size="sm" variant="outline">
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
            <CardTitle>Добавить категорию</CardTitle>
            <CardDescription>Укажите название и порядок, чтобы настроить отображение на сайте.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createCategoryAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Название</label>
                <Input name="name" placeholder="Например, Брови" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Описание</label>
                <Textarea name="description" placeholder="Короткое описание для клиентов" rows={3} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Порядок</label>
                <Input name="order" placeholder="0" type="number" />
              </div>
              <Button className="w-full" type="submit">
                Создать категорию
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
