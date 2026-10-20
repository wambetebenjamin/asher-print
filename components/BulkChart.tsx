"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Product } from "@/lib/products";
import { bulkDiscount } from "@/lib/products";
import { formatKES } from "@/lib/site";

/** Shows how the per unit price falls as quantity rises (recharts). */
export default function BulkChart({
  product,
  materialMultiplier,
  sizeMultiplier,
}: {
  product: Product;
  materialMultiplier: number;
  sizeMultiplier: number;
}) {
  const base = product.unitPrice * materialMultiplier * sizeMultiplier;
  const steps = [1, 2, 3, 5, 10, 20];
  const data = steps.map((mult) => {
    const qty = product.minQty * mult;
    const discount = bulkDiscount(qty, product.minQty);
    return {
      qty: qty.toLocaleString("en-KE"),
      unitPrice: Math.round(base * (1 - discount) * 100) / 100,
    };
  });

  return (
    <div className="border border-hairline bg-white p-4" aria-label="Bulk pricing chart">
      <h3 className="!text-base !leading-6">Bulk Savings</h3>
      <p className="mb-3 text-sm">
        Price {product.unitLabel} falls as your quantity grows.
      </p>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
            <CartesianGrid stroke="#e7e7e7" />
            <XAxis dataKey="qty" tick={{ fontSize: 12, fill: "#6a6a6a" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#6a6a6a" }}
              tickFormatter={(v: number) => `${v}`}
              width={52}
            />
            <Tooltip
              formatter={(value) => [formatKES(Number(value)), `Price ${product.unitLabel}`]}
              labelFormatter={(label) => `Quantity ${label}`}
            />
            <Line type="monotone" dataKey="unitPrice" stroke="#ee3b24" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
