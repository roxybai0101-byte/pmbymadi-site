"use client";

export default function AdminPage() {
  return (
    <main style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 16 }}>Админ-панель</h1>
      <p>Страница /admin работает ✅</p>

      <div style={{ marginTop: 24, padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
        <p>
          Дальше сюда можно добавить формы для редактирования контента (цены, фото, SEO и т.д.).
          Текущая версия — базовая проверка, что маршрут работает.
        </p>
      </div>
    </main>
  );
}
