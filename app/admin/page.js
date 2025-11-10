"use client";

import { useState } from "react";

import site from "../../../data/site.json";
import services from "../../../data/services.json";
import gallery from "../../../data/gallery.json";
import features from "../../../data/features.json";
import faq from "../../../data/faq.json";
import reviews from "../../../data/reviews.json";
import seo from "../../../data/seo.json";
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const [data, setData] = useState({
    site,
    services,
    prices,
    gallery,
    features,
    faq,
    reviews,
    seo,
  });

  function saveFile(name, content) {
    const file = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = name + ".json";
    link.click();
  }

  if (!access) {
    return (
      <div style={{ padding: 40, fontSize: 20 }}>
        <h2>Вход в админ-панель</h2>
        <input
          style={{ marginTop: 10, padding: 10, fontSize: 16 }}
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          style={{ marginTop: 20, padding: 10, fontSize: 16 }}
          onClick={() => password === "madiadmin" && setAccess(true)}
        >
          Войти
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
      <h1>Панель управления сайтом</h1>

      {/* СЕКЦИЯ УСЛУГ */}
      <h2 style={{ marginTop: 30 }}>Услуги</h2>
      <textarea
        style={{ width: "100%", height: 120 }}
        defaultValue={JSON.stringify(data.services, null, 2)}
        onChange={(e) =>
          setData({ ...data, services: JSON.parse(e.target.value) })
        }
      />
      <button
        style={{ marginTop: 10 }}
        onClick={() => saveFile("services", data.services)}
      >
        Сохранить услуги
      </button>

      {/* ЦЕНЫ */}
      <h2 style={{ marginTop: 30 }}>Цены</h2>
      <textarea
        style={{ width: "100%", height: 120 }}
        defaultValue={JSON.stringify(data.prices, null, 2)}
        onChange={(e) =>
          setData({ ...data, prices: JSON.parse(e.target.value) })
        }
      />
      <button
        style={{ marginTop: 10 }}
        onClick={() => saveFile("prices", data.prices)}
      >
        Сохранить цены
      </button>

      {/* ГАЛЕРЕЯ */}
      <h2 style={{ marginTop: 30 }}>Галерея</h2>
      <textarea
        style={{ width: "100%", height: 120 }}
        defaultValue={JSON.stringify(data.gallery, null, 2)}
        onChange={(e) =>
          setData({ ...data, gallery: JSON.parse(e.target.value) })
        }
      />
      <button
        style={{ marginTop: 10 }}
        onClick={() => saveFile("gallery", data.gallery)}
      >
        Сохранить галерею
      </button>

      {/* FAQ */}
      <h2 style={{ marginTop: 30 }}>FAQ</h2>
      <textarea
        style={{ width: "100%", height: 120 }}
        defaultValue={JSON.stringify(data.faq, null, 2)}
        onChange={(e) =>
          setData({ ...data, faq: JSON.parse(e.target.value) })
        }
      />
      <button
        style={{ marginTop: 10 }}
        onClick={() => saveFile("faq", data.faq)}
      >
        Сохранить FAQ
      </button>

      {/* ОТЗЫВЫ */}
      <h2 style={{ marginTop: 30 }}>Отзывы</h2>
      <textarea
        style={{ width: "100%", height: 120 }}
        defaultValue={JSON.stringify(data.reviews, null, 2)}
        onChange={(e) =>
          setData({ ...data, reviews: JSON.parse(e.target.value) })
        }
      />
      <button
        style={{ marginTop: 10 }}
        onClick={() => saveFile("reviews", data.reviews)}
      >
        Сохранить отзывы
      </button>

      {/* SEO */}
      <h2 style={{ marginTop: 30 }}>SEO-тексты</h2>
      <textarea
        style={{ width: "100%", height: 120 }}
        defaultValue={JSON.stringify(data.seo, null, 2)}
        onChange={(e) =>
          setData({ ...data, seo: JSON.parse(e.target.value) })
        }
      />
      <button style={{ marginTop: 10 }} onClick={() => saveFile("seo", data.seo)}>
        Сохранить SEO
      </button>
    </div>
  );
}
