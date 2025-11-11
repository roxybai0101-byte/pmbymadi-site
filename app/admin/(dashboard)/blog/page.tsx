import { getBlogPosts, getMediaLibrary } from "@/lib/data";
import { createPost, updatePost, deletePost } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function AdminBlogPage() {
  const [posts, media] = await Promise.all([getBlogPosts(), getMediaLibrary()]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Создать запись</h1>
        <form action={createPost} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>Заголовок</Label>
            <Input name="title" required placeholder="Название поста" />
          </div>
          <div className="md:col-span-2">
            <Label>Slug</Label>
            <Input name="slug" placeholder="Автоматически" />
          </div>
          <div className="md:col-span-2">
            <Label>Превью</Label>
            <Textarea name="excerpt" rows={3} placeholder="Краткое описание" />
          </div>
          <div className="md:col-span-2">
            <Label>Контент (Markdown)</Label>
            <Textarea name="content" rows={8} required placeholder="Текст статьи, можно использовать ## заголовки и списки" />
          </div>
          <div>
            <Label>Дата публикации</Label>
            <Input name="publishedAt" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
          </div>
          <div>
            <Label>Обложка</Label>
            <select
              name="coverId"
              className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Без обложки</option>
              {media.map((file) => (
                <option key={file.id} value={file.id}>
                  {file.title ?? file.url}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Создать пост
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">Записи</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="space-y-4 rounded-[28px] border border-border/60 bg-white/90 p-5 shadow-soft">
              <form action={updatePost} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={post.id} />
                <div className="md:col-span-2">
                  <Label>Заголовок</Label>
                  <Input name="title" defaultValue={post.title} />
                </div>
                <div className="md:col-span-2">
                  <Label>Slug</Label>
                  <Input name="slug" defaultValue={post.slug} />
                </div>
                <div className="md:col-span-2">
                  <Label>Превью</Label>
                  <Textarea name="excerpt" rows={3} defaultValue={post.excerpt ?? ""} />
                </div>
                <div className="md:col-span-2">
                  <Label>Контент (Markdown)</Label>
                  <Textarea name="content" rows={8} defaultValue={post.content} />
                </div>
                <div>
                  <Label>Дата публикации</Label>
                  <Input name="publishedAt" type="date" defaultValue={post.publishedAt?.toISOString().slice(0, 10) ?? ""} />
                </div>
                <div>
                  <Label>Обложка</Label>
                  <select
                    name="coverId"
                    defaultValue={post.coverId ?? ""}
                    className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Без обложки</option>
                    {media.map((file) => (
                      <option key={file.id} value={file.id}>
                        {file.title ?? file.url}
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
              <form action={deletePost}>
                <input type="hidden" name="postId" value={post.id} />
                <Button type="submit" variant="outline" className="rounded-xl">
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
