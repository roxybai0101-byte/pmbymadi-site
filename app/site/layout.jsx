
export const metadata = {
  title: "PM BY MADI",
  description: "Современный перманентный макияж. Запись скоро."
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
