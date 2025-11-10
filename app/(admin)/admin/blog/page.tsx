import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  createPostAction,
  updatePostAction,
  deletePostAction
} from "@/app/(admin)/admin/blog/actions";

export default async function AdminBlogPage() {
  const [posts, media] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        coverImage: true
      }
    }),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      take: 30
    })
  ]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Блог</h1>
        <p className="text-sm text-muted-foreground">
          Управляйте публикациями: редактируйте текст, прибивайте обложки и SEO.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {post.isPublished ? "Опубликовано" : "Черновик"} · {post.publishedAt?.toLocaleDateString("ru-RU")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={updatePostAction} className="space-y-3">
                  <input name="id" type="hidden" value={post.id} />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Заголовок</label>
                    <Input defaultValue={post.title} name="title" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Короткое описание</label>
                    <Textarea defaultValue={post.excerpt ?? ""} name="excerpt" rows={2} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Контент</label>
                    <Textarea defaultValue={post.content ?? ""} name="content" rows={6} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Дата публикации</label>
                      <Input defaultValue={post.publishedAt?.toISOString().substring(0, 10)} name="publishedAt" type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Статус</label>
                      <select
                        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        defaultValue={post.isPublished ? "true" : "false"}
                        name="isPublished"
                      >
                        <option value="true">Опубликовано</option>
                        <option value="false">Черновик</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Обложка</label>
                      <select
                        className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        defaultValue={post.coverImageId ?? ""}
                        name="coverImageId"
                      >
                        <option value="">Без обложки</option>
                        {media.map((image) => (
                          <option key={image.id} value={image.id}>
                            {image.filename}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">SEO заголовок</label>
                      <Input defaultValue={post.seoTitle ?? ""} name="seoTitle" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">SEO описание</label>
                    <Input defaultValue={post.seoDescription ?? ""} name="seoDescription" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" type="submit">
                      Сохранить
                    </Button>
                    <Button formAction={deletePostAction} formMethod="post" size="sm" variant="outline">
                      Удалить
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      <code>{post.slug}</code>
                    </span>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Создать пост</CardTitle>
            <CardDescription>Напишите новую статью и опубликуйте её на сайте.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createPostAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Заголовок</label>
                <Input name="title" placeholder="Например, Уход после перманента" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Короткое описание</label>
                <Textarea name="excerpt" rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Контент</label>
                <Textarea name="content" rows={6} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Обложка</label>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  name="coverImageId"
                >
                  <option value="">Без обложки</option>
                  {media.map((image) => (
                    <option key={image.id} value={image.id}>
                      {image.filename}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Статус</label>
                <select
                  className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue="false"
                  name="isPublished"
                >
                  <option value="true">Опубликовано</option>
                  <option value="false">Черновик</option>
                </select>
              </div>
              <Button className="w-full" type="submit">
                Создать пост
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
