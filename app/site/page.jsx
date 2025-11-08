export default function Home() {
  return (
    <main className="container">
      <section className="card">
        <div className="badge">PM BY MADI</div>
        <p style={{ fontSize: 42, margin: "12px 0 8px" }}>
          <span style={{ color: "var(--accent)" }}>перманентный макияж</span>
        </p>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          Лёгкая, натуральная эстетика. Брови, губы и межресничка – запись скоро.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <a className="btn" href="https://t.me/" target="_blank" rel="noreferrer">Записаться в Telegram</a>
          <a className="btn" href="mailto:hello@example.com">Email</a>
        </div>
      </section>

      <aside className="card">
        <h3 style={{ marginTop: 0 }}>Что внутри проекта?</h3>
        <ul style={{ lineHeight: 1.8, marginTop: 8 }}>
          <li>Next.js 14 (App Router)</li>
          <li>Простая, аккуратная стартовая страница</li>
          <li>Готово к деплою на Vercel</li>
        </ul>

        <p style={{ opacity: 0.8 }}>Дальше добавим Stripe/бота/формы и страницы.</p>
      </aside>

      <footer>PM BY MADI • Сделано с ♥</footer>
    </main>
  );
}
