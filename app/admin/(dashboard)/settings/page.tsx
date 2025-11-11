import { getSiteSettings } from "@/lib/settings";
import {
  updateBrandingSettings,
  updateContactsSettings,
  updateHeroSettings,
  updateHoursSettings,
  updateSocialsSettings
} from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Брендинг</h1>
        <form action={updateBrandingSettings} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Название</Label>
            <Input name="brand" defaultValue={settings.branding.brand} />
          </div>
          <div>
            <Label>Теглайн</Label>
            <Input name="tagline" defaultValue={settings.branding.tagline ?? ""} />
          </div>
          <div>
            <Label>Логотип (текст)</Label>
            <Input name="logoText" defaultValue={settings.branding.logoText ?? ""} />
          </div>
          <div>
            <Label>Логотип (URL)</Label>
            <Input name="logoUrl" defaultValue={settings.branding.logoUrl ?? ""} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Сохранить брендинг
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-foreground">Контакты</h2>
        <form action={updateContactsSettings} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Телефон</Label>
            <Input name="phone" defaultValue={settings.contacts.phone} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" defaultValue={settings.contacts.email} />
          </div>
          <div>
            <Label>WhatsApp</Label>
            <Input name="whatsapp" defaultValue={settings.contacts.whatsapp ?? ""} />
          </div>
          <div>
            <Label>Telegram</Label>
            <Input name="telegram" defaultValue={settings.contacts.telegram ?? ""} />
          </div>
          <div className="md:col-span-2">
            <Label>Адрес</Label>
            <Input name="address" defaultValue={settings.contacts.address ?? ""} />
          </div>
          <div className="md:col-span-2">
            <Label>Карта (iframe URL)</Label>
            <Textarea name="mapEmbedUrl" rows={2} defaultValue={settings.contacts.mapEmbedUrl ?? ""} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Сохранить контакты
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-foreground">Соцсети</h2>
        <form action={updateSocialsSettings} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <Label>Instagram</Label>
            <Input name="instagram" defaultValue={settings.socials.instagram ?? ""} />
          </div>
          <div>
            <Label>Telegram</Label>
            <Input name="telegram" defaultValue={settings.socials.telegram ?? ""} />
          </div>
          <div>
            <Label>WhatsApp</Label>
            <Input name="whatsapp" defaultValue={settings.socials.whatsapp ?? ""} />
          </div>
          <div>
            <Label>VK</Label>
            <Input name="vk" defaultValue={settings.socials.vk ?? ""} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Сохранить соцсети
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-foreground">График</h2>
        <form action={updateHoursSettings} className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <Label>Будни</Label>
            <Input name="weekdays" defaultValue={settings.hours.weekdays ?? ""} />
          </div>
          <div>
            <Label>Выходные</Label>
            <Input name="weekend" defaultValue={settings.hours.weekend ?? ""} />
          </div>
          <div>
            <Label>Примечание</Label>
            <Input name="note" defaultValue={settings.hours.note ?? ""} />
          </div>
          <div className="md:col-span-3">
            <Button type="submit" className="rounded-xl">
              Сохранить график
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-foreground">Hero блок</h2>
        <form action={updateHeroSettings} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>Заголовок</Label>
            <Textarea name="headline" rows={2} defaultValue={settings.hero.headline} />
          </div>
          <div className="md:col-span-2">
            <Label>Подзаголовок</Label>
            <Textarea name="subheadline" rows={3} defaultValue={settings.hero.subheadline ?? ""} />
          </div>
          <div>
            <Label>Основной CTA (текст)</Label>
            <Input name="ctaLabel" defaultValue={settings.hero.ctaLabel ?? ""} />
          </div>
          <div>
            <Label>Основной CTA (ссылка)</Label>
            <Input name="ctaLink" defaultValue={settings.hero.ctaLink ?? ""} />
          </div>
          <div>
            <Label>Второй CTA (текст)</Label>
            <Input name="secondaryCtaLabel" defaultValue={settings.hero.secondaryCtaLabel ?? ""} />
          </div>
          <div>
            <Label>Второй CTA (ссылка)</Label>
            <Input name="secondaryCtaLink" defaultValue={settings.hero.secondaryCtaLink ?? ""} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Сохранить Hero
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
