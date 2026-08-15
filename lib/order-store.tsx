"use client";

/**
 * Client-side order state backed by zustand (persist → localStorage). SSR
 * always renders an empty order; the store rehydrates on the client after
 * mount, so the order survives a page refresh without any hydration noise.
 *
 * No backend, no payment — a future checkout step could consume `lines` /
 * `totalPrice` from here without any changes.
 */
import { type ReactNode, useEffect, useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { type Product, products } from "@/lib/config/products";
import type { OrderLine } from "@/lib/types";

const STORAGE_KEY = "greenvaluefarms:order:v1";

interface OrderStoreState {
  /** productId -> quantity (0 = not in order). */
  quantities: Record<string, number>;
  /** Whether the order summary sheet is open. */
  isOpen: boolean;
  /** Add `qty` of a product to the order (merges with an existing line). */
  add: (productId: string, qty?: number) => void;
  /** Set the exact quantity for a product (0 removes the line). */
  setQty: (productId: string, qty: number) => void;
  /** Remove a product from the order entirely. */
  remove: (productId: string) => void;
  /** Empty the whole order. */
  clear: () => void;
  openSheet: () => void;
  closeSheet: () => void;
}

const useOrderStore = create<OrderStoreState>()(
  persist(
    (set) => ({
      quantities: {},
      isOpen: false,
      add: (productId, qty = 1) =>
        set((state) => ({
          quantities: {
            ...state.quantities,
            [productId]: (state.quantities[productId] ?? 0) + Math.max(0, qty),
          },
        })),
      setQty: (productId, qty) =>
        set((state) => {
          const quantities = { ...state.quantities };
          if (qty <= 0) delete quantities[productId];
          else quantities[productId] = qty;
          return { quantities };
        }),
      remove: (productId) =>
        set((state) => {
          const quantities = { ...state.quantities };
          delete quantities[productId];
          return { quantities };
        }),
      clear: () => set({ quantities: {} }),
      openSheet: () => set({ isOpen: true }),
      closeSheet: () => set({ isOpen: false }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ quantities: state.quantities }),
      skipHydration: true,
    },
  ),
);

/**
 * Hydration wrapper — NOT a context provider. Components read the store
 * directly via `useOrder()` (zustand's store is global); this exists solely
 * to rehydrate the persisted order from localStorage *after* the client
 * mounts. With `skipHydration`, SSR and the first client paint both render
 * an empty order (no hydration mismatch), then the saved order is restored
 * in one safe re-render.
 */
export function OrderProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useOrderStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

export interface OrderStore {
  /** Resolved order lines (product + qty), filtered to known products. */
  lines: OrderLine[];
  /** Total quantity of all items across every line. */
  totalItems: number;
  /** Total price of all items (sum of qty × unit price). */
  totalPrice: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

export function useOrder(): OrderStore {
  const {
    quantities,
    isOpen,
    add,
    setQty,
    remove,
    clear,
    openSheet,
    closeSheet,
  } = useOrderStore(
    useShallow((state) => ({
      quantities: state.quantities,
      isOpen: state.isOpen,
      add: state.add,
      setQty: state.setQty,
      remove: state.remove,
      clear: state.clear,
      openSheet: state.openSheet,
      closeSheet: state.closeSheet,
    })),
  );

  const lines = useMemo<OrderLine[]>(() => {
    const byId = new Map<string, Product>(products.map((p) => [p.id, p]));
    return Object.entries(quantities)
      .map(([productId, qty]): OrderLine | null => {
        const product = byId.get(productId);
        return product ? { product, qty } : null;
      })
      .filter((line): line is OrderLine => line !== null)
      .filter((line) => line.qty > 0);
  }, [quantities]);

  const totalItems = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const totalPrice = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty * line.product.price, 0),
    [lines],
  );

  return useMemo(
    () => ({
      lines,
      totalItems,
      totalPrice,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openSheet,
      closeSheet,
    }),
    [
      lines,
      totalItems,
      totalPrice,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openSheet,
      closeSheet,
    ],
  );
}

/** Convenience lookup for a product by id (falls back to the first product). */
export function getProduct(productId: string): Product {
  return products.find((p) => p.id === productId) ?? products[0];
}
