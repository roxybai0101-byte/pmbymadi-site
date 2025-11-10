type ReviewEditPageProps = {
  params: { id: string };
};

export default function AdminReviewEditPage({ params }: ReviewEditPageProps) {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6">
      <header>
        <h1 className="font-serif text-3xl">Редактирование отзыва</h1>
        <p className="text-muted-foreground">ID: {params.id}</p>
      </header>
    </main>
  );
}
