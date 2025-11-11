import { getPages, getFaqItems } from "@/lib/data";
import { createPage, updatePage, deletePage } from "@/actions/pages";
import { createFaqItem, updateFaqItem, deleteFaqItem } from "@/actions/faq";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function AdminPagesPage() {
  const [pages, faq] = await Promise.all([getPages(), getFaqItems()]);

  return (
    <div className="space-y-10">
      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Создать страницу</h1>
        <form action={createPage} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Slug</Label>
            <Input name="slug" required placeholder="Например, about" />
          </div>
          <div>
            <Label>Заголовок</Label>
            <Input name="title" required placeholder="Название страницы" />
          </div>
          <div className="md:col-span-2">
            <Label>Описание</Label>
            <Textarea name="description" rows={2} placeholder="Краткое описание" />
          </div>
          <div className="md:col-span-2">
            <Label>Контент</Label>
            <Textarea name="content" rows={6} required placeholder="Основной текст" />
          </div>
          <div>
            <Label>Meta Title</Label>
            <Input name="metaTitle" placeholder="SEO заголовок" />
          </div>
          <div>
            <Label>Meta Description</Label>
            <Input name="metaDescription" placeholder="SEO описание" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Создать страницу
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">Страницы</h2>
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page.id} className="space-y-4 rounded-[28px] border border-border/60 bg-white/90 p-5 shadow-soft">
              <form action={updatePage} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={page.id} />
                <div>
                  <Label>Slug</Label>
                  <Input name="slug" defaultValue={page.slug} />
                </div>
                <div>
                  <Label>Заголовок</Label>
                  <Input name="title" defaultValue={page.title} />
                </div>
                <div className="md:col-span-2">
                  <Label>Описание</Label>
                  <Textarea name="description" rows={2} defaultValue={page.description ?? ""} />
                </div>
                <div className="md:col-span-2">
                  <Label>Контент</Label>
                  <Textarea name="content" rows={6} defaultValue={page.content} />
                </div>
                <div>
                  <Label>Meta Title</Label>
                  <Input name="metaTitle" defaultValue={page.metaTitle ?? ""} />
                </div>
                <div>
                  <Label>Meta Description</Label>
                  <Input name="metaDescription" defaultValue={page.metaDescription ?? ""} />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <Button type="submit" className="rounded-xl">
                    Сохранить
                  </Button>
                </div>
              </form>
              <form action={deletePage}>
                <input type="hidden" name="pageId" value={page.id} />
                <Button variant="outline" type="submit" className="rounded-xl">
                  Удалить
                </Button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-foreground">FAQ</h2>
        <form action={createFaqItem} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>Вопрос</Label>
            <Input name="question" required placeholder="Вопрос" />
          </div>
          <div className="md:col-span-2">
            <Label>Ответ</Label>
            <Textarea name="answer" rows={3} required placeholder="Ответ" />
          </div>
          <div>
            <Label>Порядок</Label>
            <Input name="order" type="number" min={0} defaultValue={faq.length + 1} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Добавить вопрос
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.id} className="space-y-4 rounded-[24px] border border-border/60 bg-background/70 p-5">
              <form action={updateFaqItem} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                <div>
                  <Label>Вопрос</Label>
                  <Input name="question" defaultValue={item.question} />
                </div>
                <div>
                  <Label>Ответ</Label>
                  <Textarea name="answer" rows={3} defaultValue={item.answer} />
                </div>
                <div>
                  <Label>Порядок</Label>
                  <Input name="order" type="number" defaultValue={item.order ?? 0} />
                </div>
                <Button type="submit" className="rounded-xl">
                  Сохранить
                </Button>
              </form>
              <form action={deleteFaqItem}>
                <input type="hidden" name="faqId" value={item.id} />
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
