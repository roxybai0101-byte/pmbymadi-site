"use client";
import { useState, useEffect } from "react";
import site from "@/data/site.json";
import services from "@/data/services.json";
import gallery from "@/data/gallery.json";
import features from "@/data/features.json";
import faq from "@/data/faq.json";
import reviews from "@/data/reviews.json";
import seo from "@/data/seo.json";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const [data, setData] = useState({
    site,
    services,
    gallery,
    features,
    faq,
    reviews,
    seo,
  });

  const updateValue = (section, index, field, value) => {
    const updated = { ...data };
    updated[section][index][field] = value;
    setData(updated);
  };

  const saveChanges = async () => {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, data }),
    });

    const json = await res.json();
    alert(json.message);
  };

  if (!access) {
    return (
      <div className="p-10 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-3">Вход в админку</h2>

        <input
          type="password"
          placeholder="Введите пароль"
          className="border p-2 rounded w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => setAccess(true)}
          className="px-4 py-2 bg-ink text-white rounded"
        >
          Войти
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">Админка PM BY MADI</h1>

      {/* ---- УСЛУГИ ---- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Услуги</h2>
        {data.services.map((item, i) => (
          <div key={i} className="border p-4 rounded mb-3 space-y-2">
            <input
              value={item.title}
              onChange={(e) => updateValue("services", i, "title", e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Название"
            />
            <input
              value={item.price}
              onChange={(e) => updateValue("services", i, "price", e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Цена"
            />
          </div>
        ))}
      </section>

      {/* ---- ГАЛЕРЕЯ ---- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Галерея</h2>
        {data.gallery.map((item, i) => (
          <div key={i} className="border p-4 rounded mb-3 space-y-2">
            <input
              value={item.file}
              onChange={(e) => updateValue("gallery", i, "file", e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Имя файла"
            />
            <input
              value={item.title}
              onChange={(e) => updateValue("gallery", i, "title", e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Подпись"
            />
          </div>
        ))}
      </section>

      {/* ---- SEO ---- */}
      <section>
        <h2 className="text-xl font-semibold mb-4">SEO</h2>
        <input
          value={data.seo.title}
          onChange={(e) => {
            const updated = { ...data };
            updated.seo.title = e.target.value;
            setData(updated);
          }}
          className="border p-2 w-full rounded mb-2"
          placeholder="SEO Title"
        />

        <textarea
          value={data.seo.description}
          onChange={(e) => {
            const updated = { ...data };
            updated.seo.description = e.target.value;
            setData(updated);
          }}
          className="border p-2 w-full rounded"
          placeholder="SEO Description"
        />
      </section>

      <button
        onClick={saveChanges}
        className="px-6 py-3 bg-ink text-white rounded-lg shadow"
      >
        💾 Сохранить изменения
      </button>
    </div>
  );
}
