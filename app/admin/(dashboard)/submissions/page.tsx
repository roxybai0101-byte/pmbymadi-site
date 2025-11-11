import { getSubmissions } from "@/lib/data";
import { updateSubmissionStatus, deleteSubmission } from "@/actions/submissions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-foreground">Заявки и вопросы</h1>
      <div className="grid gap-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="space-y-4 rounded-[28px] border border-border/60 bg-white/90 p-5 shadow-soft">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">{submission.name}</p>
                <p className="text-sm text-muted-foreground">{submission.contact}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary">
                {submission.type === "BOOKING" ? "Запись" : "Вопрос"}
              </span>
            </div>
            <div className="text-sm text-foreground/80">
              {submission.message ? submission.message : "Без комментария"}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(submission.createdAt)} {submission.service ? `· Услуга: ${submission.service.title}` : null}
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <form action={updateSubmissionStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={submission.id} />
                <Label className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Статус</Label>
                <select
                  name="status"
                  defaultValue={submission.status}
                  className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground"
                >
                  <option value="NEW">Новая</option>
                  <option value="IN_PROGRESS">В работе</option>
                  <option value="COMPLETED">Завершена</option>
                </select>
                <Button type="submit" size="sm" className="rounded-xl">
                  Обновить
                </Button>
              </form>
              <form action={deleteSubmission}>
                <input type="hidden" name="submissionId" value={submission.id} />
                <Button variant="outline" size="sm" className="rounded-xl">
                  Удалить
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
