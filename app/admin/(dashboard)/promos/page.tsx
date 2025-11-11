import { getPromos } from "@/lib/data";
import { createPromo, updatePromo, deletePromo } from "@/actions/promos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default async function AdminPromosPage() {
  const promos = await getPromos();

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-border/60 bg-white/90 p-6 shadow-soft">
        <h1 className="font-serif text-2xl text-foreground">Добавить акцию</h1>
        <form action={createPromo} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>Заголовок</Label>
            <Input name="title" required placeholder="Например, -15% на коррекцию" />
          </div>
          <div className="md:col-span-2">
            <Label>Описание</Label>
            <Textarea name="description" rows={3} placeholder="Краткое описание акции" />
          </div>
          <div className="md:col-span-2">
            <Label>Детали</Label>
            <Textarea name="details" rows={3} placeholder="Условия, сроки и т.д." />
          </div>
          <div>
            <Label>Дата начала</Label>
            <Input name="startsAt" type="date" />
          </div>
          <div>
            <Label>Дата окончания</Label>
            <Input name="endsAt" type="date" />
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" id="promo-active" name="isActive" defaultChecked />
            <Label htmlFor="promo-active" className="text-sm text-muted-foreground">
              Активна
            </Label>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="rounded-xl">
              Создать акцию
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">Акции</h2>
        <div className="space-y-4">
          {promos.map((promo) => (
            <div key={promo.id} className="space-y-4 rounded-[28px] border border-border/60 bg-white/90 p-5 shadow-soft">
              <form action={updatePromo} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={promo.id} />
                <div className="md:col-span-2">
                  <Label>Заголовок</Label>
                  <Input name="title" defaultValue={promo.title} />
                </div>
                <div className="md:col-span-2">
                  <Label>Описание</Label>
                  <Textarea name="description" rows={3} defaultValue={promo.description ?? ""} />
                </div>
                <div className="md:col-span-2">
                  <Label>Детали</Label>
                  <Textarea name="details" rows={3} defaultValue={promo.details ?? ""} />
                </div>
                <div>
                  <Label>Дата начала</Label>
                  <Input name="startsAt" type="date" defaultValue={promo.startsAt?.toISOString().slice(0, 10) ?? ""} />
                </div>
                <div>
                  <Label>Дата окончания</Label>
                  <Input name="endsAt" type="date" defaultValue={promo.endsAt?.toISOString().slice(0, 10) ?? ""} />
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <input type="checkbox" id={`promo-${promo.id}`} name="isActive" value="true" defaultChecked={promo.isActive} />
                  <Label htmlFor={`promo-${promo.id}`} className="text-sm text-muted-foreground">
                    Активна
                  </Label>
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <Button type="submit" className="rounded-xl">
                    Сохранить
                  </Button>
                </div>
              </form>
              <form action={deletePromo}>
                <input type="hidden" name="promoId" value={promo.id} />
                <Button variant="outline" type="submit" className="rounded-xl">
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
