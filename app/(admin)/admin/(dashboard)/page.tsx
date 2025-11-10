import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const [servicesCount, portfolioCount, reviewsCount, submissionsCount, latestSubmissions] = await Promise.all([
    prisma.service.count(),
    prisma.portfolioItem.count(),
    prisma.review.count(),
    prisma.submission.count(),
    prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
      take: 6
    })
  ]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl text-foreground">Панель управления</h1>
        <p className="text-sm text-muted-foreground">
          Следите за ключевыми показателями студии и обрабатывайте заявки клиентов.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Активные услуги</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-foreground">{servicesCount}</CardContent>
        </Card>
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Работы в портфолио</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-foreground">{portfolioCount}</CardContent>
        </Card>
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Отзывы</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-foreground">{reviewsCount}</CardContent>
        </Card>
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Всего заявок</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold text-foreground">{submissionsCount}</CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">Последние заявки</h2>
          <Badge variant="subtle">Обновляется в реальном времени</Badge>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Имя</th>
                <th className="px-4 py-3 text-left font-medium">Контакт</th>
                <th className="px-4 py-3 text-left font-medium">Тип</th>
                <th className="px-4 py-3 text-left font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {latestSubmissions.map((submission) => (
                <tr key={submission.id} className="border-t border-border/50">
                  <td className="px-4 py-3">{submission.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{submission.contact}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">
                      {submission.type === "BOOKING" ? "Запись" : "Вопрос"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {format(submission.createdAt, "d MMMM yyyy, HH:mm", { locale: ru })}
                  </td>
                </tr>
              ))}
              {latestSubmissions.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-muted-foreground" colSpan={4}>
                    Заявок пока нет.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
