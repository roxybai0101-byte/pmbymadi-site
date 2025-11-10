type AdminPageEditProps = {
  params: { slug: string };
};

export default function AdminPageEdit({ params }: AdminPageEditProps) {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6">
      <header>
        <h1 className="font-serif text-3xl">Редактирование страницы</h1>
        <p className="text-muted-foreground">Страница: {params.slug}</p>
      </header>
    </main>
  );
}
