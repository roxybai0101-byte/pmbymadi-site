import { PRICES } from "@/data/prices";

export default function PriceList() {
  return (
    <section className="container py-12">
      <h2 className="text-3xl font-bold mb-6">Цены</h2>

      <div className="space-y-4">
        {PRICES.map((item, index) => (
          <div
            key={index}
            className="flex justify-between p-4 rounded-xl border bg-white/60 backdrop-blur shadow-sm"
          >
            <span>{item.title}</span>
            <span className="font-semibold">{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
