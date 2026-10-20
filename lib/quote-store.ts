"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QuoteItem = {
  id: string;
  slug: string;
  name: string;
  material: string;
  size: string;
  qty: number;
  unitPrice: number;
  total: number;
  artworkUrl: string;
  notes: string;
};

type QuoteState = {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...item, id: `${item.slug}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id !== id) return i;
            const safeQty = Math.max(1, Math.floor(qty) || 1);
            const unit = i.qty > 0 ? i.total / i.qty : i.unitPrice;
            return { ...i, qty: safeQty, total: Math.round(unit * safeQty) };
          }),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.total, 0),
    }),
    { name: "asher-print-quote" },
  ),
);
