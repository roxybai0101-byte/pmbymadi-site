import { getDashboardMetrics, getSubmissions } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [metrics, submissions] = await Promise.all([getDashboardMetrics(), getSubmissions()]);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-serif text-3xl text-foreground">Сводка</h1>
        <p className="mt-2 text-sm text-muted-foreground">Быстрый обзор ключевых показателей проекта.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Услуги" value={metrics.servicesCount} subtitle="Опубликовано услуг" />
          <StatCard title="Заявки" value={metrics.submissionsCount} subtitle="В очереди на связь" />
          <StatCard title="Портфолио" value={metrics.portfolioCount} subtitle="Работы в галерее" />
          <StatCard title="Отзывы" value={metrics.reviewsCount} subtitle="Одобрено отзывов" />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">Последние заявки</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {submissions.slice(0, 6).map((submission) => (
            <Card key={submission.id} className="border border-border/60 bg-white/90">
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{submission.name}</p>
                    <p className="text-xs text-muted-foreground">{submission.contact}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary">
                    {submission.type === "BOOKING" ? "Запись" : "Вопрос"}
                  </span>
                </div>
                {submission.service ? (
                  <p className="text-xs text-muted-foreground">Услуга: {submission.service.title}</p>
                ) : null}
                {submission.message ? <p className="text-sm text-foreground/80">{submission.message}</p> : null}
                <p className="text-xs text-muted-foreground">{formatDate(submission.createdAt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: number; subtitle: string }) {
  return (
    <Card className="border border-border/60 bg-white/90">
      <CardContent className="space-y-2 p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
