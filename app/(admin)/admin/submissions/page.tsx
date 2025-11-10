import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateSubmissionStatusAction } from "@/app/(admin)/admin/submissions/actions";
import { SubmissionStatus } from "@prisma/client";

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Заявки</h1>
        <p className="text-sm text-muted-foreground">
          Просматривайте запросы клиентов, меняйте статус и контактируйте напрямую.
        </p>
      </header>

      <div className="grid gap-4">
        {submissions.map((submission) => (
          <Card key={submission.id} className="border-border/60 bg-card/70">
            <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>{submission.name}</CardTitle>
                <CardDescription>{submission.contact}</CardDescription>
              </div>
              <Badge
                variant={
                  submission.status === "DONE"
                    ? "default"
                    : submission.status === "IN_PROGRESS"
                      ? "outline"
                      : "subtle"
                }
              >
                {submission.status === "NEW"
                  ? "Новая"
                  : submission.status === "IN_PROGRESS"
                    ? "В работе"
                    : "Завершена"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {submission.service ? <p>Услуга: {submission.service}</p> : null}
              {submission.message ? (
                <p className="whitespace-pre-line leading-relaxed">{submission.message}</p>
              ) : null}
              <div className="text-xs text-muted-foreground">
                Отправлено: {submission.createdAt.toLocaleString("ru-RU")}
              </div>
              <form action={updateSubmissionStatusAction} className="flex flex-wrap items-center gap-3">
                <input name="id" type="hidden" value={submission.id} />
                <select
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={submission.status}
                  name="status"
                >
                  {Object.values(SubmissionStatus).map((status) => (
                    <option key={status} value={status}>
                      {status === "NEW" ? "Новая" : status === "IN_PROGRESS" ? "В работе" : "Завершена"}
                    </option>
                  ))}
                </select>
                <Button size="sm" type="submit">
                  Обновить статус
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
        {!submissions.length ? (
          <Card className="border-border/60 bg-card/70">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Заявок пока нет.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
