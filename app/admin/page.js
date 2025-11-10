"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const login = () => {
    if (password === "madi2025") {
      setAccess(true);
    } else {
      alert("Неверный пароль");
    }
  };

  if (!access) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Админ панель</h1>
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Войти</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Админка работает ✅</h1>
      <p>Позже добавим редактирование контента</p>
    </div>
  );
}
