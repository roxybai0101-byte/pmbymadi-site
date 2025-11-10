type PromoEditPageProps = {
  params: { id: string };
};

export default function AdminPromoEditPage({ params }: PromoEditPageProps) {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6">
      <header>
        <h1 className="font-serif text-3xl">Редактирование акции</h1>
        <p className="text-muted-foreground">ID: {params.id}</p>
      </header>
    </main>
  );
}
