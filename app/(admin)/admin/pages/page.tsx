import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateSimplePageAction, updateFaqPageAction } from "@/app/(admin)/admin/pages/actions";

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({
    where: { slug: { in: ["about", "policy", "offer", "faq"] } }
  });

  const map = Object.fromEntries(pages.map((page) => [page.slug, page]));
  const faqPage = map.faq;
  const faqItems =
    typeof faqPage?.content === "object" && faqPage?.content && "items" in faqPage.content
      ? (faqPage.content.items as Array<{ question: string; answer: string }>)
      : [];

  const simplePageSlugs = ["about", "policy", "offer"] as const;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Статические страницы</h1>
        <p className="text-sm text-muted-foreground">Редактируйте тексты, FAQ и юридические документы для сайта.</p>
      </header>

      <div className="grid gap-6">
        {simplePageSlugs.map((slug) => {
          const page = map[slug];
          const markdown =
            typeof page?.content === "object" && page?.content && "markdown" in page.content
              ? String(page.content.markdown)
              : "";
          return (
            <Card key={slug} className="border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle>{page?.title ?? slug}</CardTitle>
                <CardDescription>Редактируйте содержимое страницы {slug === "about" ? "«О мастере»" : slug === "policy" ? "«Политика конфиденциальности»" : "«Оферта»"}.</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updateSimplePageAction} className="space-y-3">
                  <input name="slug" type="hidden" value={slug} />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Заголовок</label>
                    <Input defaultValue={page?.title ?? ""} name="title" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Короткое описание</label>
                    <Textarea defaultValue={page?.excerpt ?? ""} name="excerpt" rows={2} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Контент (Markdown)</label>
                    <Textarea defaultValue={markdown} name="markdown" rows={6} required />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">SEO заголовок</label>
                      <Input defaultValue={page?.seoTitle ?? ""} name="seoTitle" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">SEO описание</label>
                      <Input defaultValue={page?.seoDescription ?? ""} name="seoDescription" />
                    </div>
                  </div>
                  <Button type="submit">Сохранить</Button>
                </form>
              </CardContent>
            </Card>
          );
        })}

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>{faqPage?.title ?? "FAQ"}</CardTitle>
            <CardDescription>Редактируйте вопросы-ответы и SEO-настройки для страницы FAQ.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateFaqPageAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Заголовок</label>
                <Input defaultValue={faqPage?.title ?? ""} name="title" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Короткое описание</label>
                <Textarea defaultValue={faqPage?.excerpt ?? ""} name="excerpt" rows={2} />
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Вопросы и ответы</p>
                {Array.from({ length: Math.max(faqItems.length, 4) }).map((_, index) => {
                  const item = faqItems[index];
                  return (
                    <div key={index} className="grid gap-3 md:grid-cols-2">
                      <Input defaultValue={item?.question ?? ""} name="question" placeholder="Вопрос" />
                      <Input defaultValue={item?.answer ?? ""} name="answer" placeholder="Ответ" />
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">SEO заголовок</label>
                  <Input defaultValue={faqPage?.seoTitle ?? ""} name="seoTitle" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">SEO описание</label>
                  <Input defaultValue={faqPage?.seoDescription ?? ""} name="seoDescription" />
                </div>
              </div>
              <Button type="submit">Сохранить FAQ</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
