type CategoryEditPageProps = {
  params: { id: string };
};

export default function AdminServiceCategoryEditPage({ params }: CategoryEditPageProps) {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6">
      <header>
        <h1 className="font-serif text-3xl">Редактирование категории</h1>
        <p className="text-muted-foreground">ID: {params.id}</p>
      </header>
    </main>
  );
}
