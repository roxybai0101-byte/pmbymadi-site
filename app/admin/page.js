"use client";

import { useState } from "react";

// пути к JSON данным (папка /data в корне репозитория)
import siteJson from "../../data/site.json";
import servicesJson from "../../data/services.json";
import galleryJson from "../../data/gallery.json";
import featuresJson from "../../data/features.json";
import faqJson from "../../data/faq.json";
import reviewsJson from "../../data/reviews.json";
import seoJson from "../../data/seo.json";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASS || "madi2025";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const [data, setData] = useState({
    site: siteJson,
    services: servicesJson,
    gallery: galleryJson,
    features: featuresJson,
    faq: faqJson,
    reviews: reviewsJson,
    seo: seoJson,
  });

  const updateValue = (section, index, field, value) => {
    const updated = { ...data };
    if (Array.isArray(updated[section])) {
      updated[section][index][field] = value;
    } else {
      updated[section][field] = value;
    }
    setData(updated);
  };

  const addItem = (section, template) => {
    const updated = { ...data };
    updated[section] = [...updated[section], template];
    setData(updated);
  };

  const removeItem = (section, index) => {
    const updated = { ...data };
    updated[section] = updated[section].filter((_, i) => i !== index);
    setData(updated);
  };

  const saveAll = async () => {
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const t = await res.text();
        alert("Ошибка сохранения: " + t);
        return;
      }

      alert("Сохранено! Проверь сайт и запусти новый деплой, если нужно.");
    } catch (e) {
      alert("Сеть/ошибка: " + e.message);
    }
  };

  if (!access) {
    return (
      <div style={{ maxWidth: 560, margin: "80px auto", fontFamily: "ui-sans-serif" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Вход в админку</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>Введите пароль администратора.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 10 }}
        />
        <button
          onClick={() => setAccess(password === ADMIN_PASSWORD)}
          style={{ marginTop: 12, padding: "10px 16px", borderRadius: 10, border: "1px solid #222" }}
        >
          Войти
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px", fontFamily: "ui-sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Админка сайта</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Редактируйте данные. После изменений нажмите «Сохранить всё».
      </p>

      {/* Блок: SEO */}
      <section style={{ margin: "24px 0", padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>SEO</h2>
        {Object.keys(data.seo).map((key) => (
          <div key={key} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 10 }}>
            <label style={{ opacity: 0.7 }}>{key}</label>
            <input
              value={data.seo[key] || ""}
              onChange={(e) => updateValue("seo", null, key, e.target.value)}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 10 }}
            />
          </div>
        ))}
      </section>

      {/* Блок: Ссылки/контакты и пр. (site.json) */}
      <section style={{ margin: "24px 0", padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Настройки сайта (site.json)</h2>
        {Object.keys(data.site).map((key) => (
          <div key={key} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 10 }}>
            <label style={{ opacity: 0.7 }}>{key}</label>
            <input
              value={data.site[key] || ""}
              onChange={(e) => updateValue("site", null, key, e.target.value)}
              style={{ padding: 10, border: "1px solid #ddd", borderRadius: 10 }}
            />
          </div>
        ))}
      </section>

      {/* Блок: Услуги */}
      <SectionArray
        title="Услуги (services.json)"
        section="services"
        items={data.services}
        fields={[["title", "Название"], ["description", "Описание"], ["price", "Цена"]]}
        onChange={updateValue}
        onAdd={() => addItem("services", { title: "", description: "", price: "" })}
        onRemove={removeItem}
      />

      {/* Блок: Галерея */}
      <SectionArray
        title="Галерея (gallery.json)"
        section="gallery"
        items={data.gallery}
        fields={[["src", "Файл (из /public)"], ["alt", "ALT-текст"]]}
        onChange={updateValue}
        onAdd={() => addItem("gallery", { src: "", alt: "" })}
        onRemove={removeItem}
      />

      {/* Блок: Особенности */}
      <SectionArray
        title="Особенности (features.json)"
        section="features"
        items={data.features}
        fields={[["title", "Заголовок"], ["description", "Описание"]]}
        onChange={updateValue}
        onAdd={() => addItem("features", { title: "", description: "" })}
        onRemove={removeItem}
      />

      {/* Блок: FAQ */}
      <SectionArray
        title="FAQ (faq.json)"
        section="faq"
        items={data.faq}
        fields={[["q", "Вопрос"], ["a", "Ответ"]]}
        onChange={updateValue}
        onAdd={() => addItem("faq", { q: "", a: "" })}
        onRemove={removeItem}
      />

      {/* Блок: Отзывы */}
      <SectionArray
        title="Отзывы (reviews.json)"
        section="reviews"
        items={data.reviews}
        fields={[["name", "Имя"], ["text", "Отзыв"]]}
        onChange={updateValue}
        onAdd={() => addItem("reviews", { name: "", text: "" })}
        onRemove={removeItem}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button onClick={saveAll} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #222" }}>
          Сохранить всё
        </button>
      </div>
    </div>
  );
}

function SectionArray({ title, section, items, fields, onChange, onAdd, onRemove }) {
  return (
    <section style={{ margin: "24px 0", padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h2>
        <button onClick={onAdd} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #aaa" }}>
          + Добавить
        </button>
      </div>

      {items?.length === 0 && <p style={{ opacity: 0.6 }}>Пока пусто</p>}

      {items?.map((item, index) => (
        <div key={index} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "grid", gap: 10 }}>
            {fields.map(([key, label]) => (
              <div key={key} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12 }}>
                <label style={{ opacity: 0.7 }}>{label}</label>
                <input
                  value={item[key] ?? ""}
                  onChange={(e) => onChange(section, index, key, e.target.value)}
                  style={{ padding: 10, border: "1px solid #ddd", borderRadius: 10 }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
            <button
              onClick={() => onRemove(section, index)}
              style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #d33", color: "#d33" }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
