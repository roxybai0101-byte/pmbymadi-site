import { prisma } from "../../../../lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, SectionDescription } from "@pmby/ui";

export const metadata = {
  title: "Admin Dashboard — PM BY MADI"
};

export default async function AdminDashboardPage() {
  const [servicesCount, portfolioCount, reviewsCount, faqCount, publishedServices] = await Promise.all([
    prisma.service.count(),
    prisma.portfolioItem.count(),
    prisma.review.count(),
    prisma.faqItem.count(),
    prisma.service.count({ where: { published: true } })
  ]);

  const leads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-brand-chocolate">Панель управления</h1>
        <p className="mt-2 text-sm text-brand-cocoa/70">
          Быстрый обзор активности и контента.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Услуги</CardTitle>
            <SectionDescription>
              {publishedServices}/{servicesCount} опубликовано
            </SectionDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Портфолио</CardTitle>
            <SectionDescription>{portfolioCount} работ</SectionDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Отзывы</CardTitle>
            <SectionDescription>{reviewsCount} записей</SectionDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <SectionDescription>{faqCount} вопросов</SectionDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-white/90">
        <CardHeader>
          <CardTitle>Свежие заявки</CardTitle>
          <SectionDescription>5 последних обращений через сайт</SectionDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl border border-brand-cocoa/10 bg-brand-powder/40 px-4 py-3 text-sm text-brand-chocolate/80"
              >
                <div className="flex items-center justify-between text-sm font-medium text-brand-chocolate">
                  <span>{lead.name}</span>
                  <span>{new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(lead.createdAt)}</span>
                </div>
                <p className="mt-1 text-xs text-brand-cocoa/70">{lead.phone}</p>
                {lead.serviceName ? (
                  <p className="mt-1 text-xs text-brand-cocoa/70">Услуга: {lead.serviceName}</p>
                ) : null}
                {lead.comment ? (
                  <p className="mt-1 text-xs text-brand-cocoa/70">Комментарий: {lead.comment}</p>
                ) : null}
              </div>
            ))}
            {leads.length === 0 ? <p className="text-sm text-brand-cocoa/70">Заявок пока нет.</p> : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
