type PortfolioEditPageProps = {
  params: { id: string };
};

export default function AdminPortfolioEditPage({ params }: PortfolioEditPageProps) {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6">
      <header>
        <h1 className="font-serif text-3xl">Редактирование работы</h1>
        <p className="text-muted-foreground">ID: {params.id}</p>
      </header>
    </main>
  );
}
