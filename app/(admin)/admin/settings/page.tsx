import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateSiteSettingsAction, updateContactSettingsAction } from "@/app/(admin)/admin/settings/actions";

export default async function AdminSettingsPage() {
  const [siteSetting, contactsSetting] = await Promise.all([
    prisma.setting.findUnique({ where: { key: "site" } }),
    prisma.setting.findUnique({ where: { key: "contacts" } })
  ]);

  const siteValue = (siteSetting?.value as any) ?? {};
  const contactsValue = (contactsSetting?.value as any) ?? {};

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Настройки сайта</h1>
        <p className="text-sm text-muted-foreground">
          Обновляйте бренд, слоганы, контактную информацию и рабочие часы.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Бренд и SEO</CardTitle>
            <CardDescription>Измените основные элементы публичной части сайта.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateSiteSettingsAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Название</label>
                <Input defaultValue={siteValue.name ?? ""} name="name" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Слоган</label>
                <Input defaultValue={siteValue.tagline ?? ""} name="tagline" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Подзаголовок</label>
                <Textarea defaultValue={siteValue.subheading ?? ""} name="subheading" rows={3} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">CTA текст</label>
                  <Input defaultValue={siteValue.cta?.label ?? ""} name="ctaLabel" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">CTA ссылка</label>
                  <Input defaultValue={siteValue.cta?.href ?? ""} name="ctaHref" />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">SEO заголовок</label>
                  <Input defaultValue={siteValue.seo?.title ?? ""} name="seoTitle" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">SEO описание</label>
                  <Input defaultValue={siteValue.seo?.description ?? ""} name="seoDescription" />
                </div>
              </div>
              <Button type="submit">Сохранить</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/70">
          <CardHeader>
            <CardTitle>Контакты</CardTitle>
            <CardDescription>Обновите контактные данные, ссылки и график работы.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateContactSettingsAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Телефон</label>
                <Input defaultValue={contactsValue.phone ?? ""} name="phone" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">WhatsApp</label>
                  <Input defaultValue={contactsValue.whatsapp ?? ""} name="whatsapp" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input defaultValue={contactsValue.email ?? ""} name="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Адрес</label>
                <Textarea defaultValue={contactsValue.address ?? ""} name="address" rows={2} />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Input defaultValue={contactsValue.instagram ?? ""} name="instagram" placeholder="Instagram URL" />
                <Input defaultValue={contactsValue.telegram ?? ""} name="telegram" placeholder="Telegram URL" />
                <Input defaultValue={contactsValue.tiktok ?? ""} name="tiktok" placeholder="TikTok URL" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">iframe карты</label>
                <Textarea defaultValue={contactsValue.mapEmbed ?? ""} name="mapEmbed" rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">График работы</label>
                {Array.from({ length: Math.max(contactsValue.workingHours?.length ?? 0, 2) }).map((_, index) => {
                  const row = contactsValue.workingHours?.[index];
                  return (
                    <div className="grid gap-3 md:grid-cols-2" key={index}>
                      <Input defaultValue={row?.days ?? ""} name="days" placeholder="Например, Пн–Пт" />
                      <Input defaultValue={row?.time ?? ""} name="time" placeholder="10:00 – 20:00" />
                    </div>
                  );
                })}
              </div>
              <Button type="submit">Сохранить контакты</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
