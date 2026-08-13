"use client";

/**
 * Lightweight client-side order state backed by an external store
 * (localStorage) via useSyncExternalStore — the React-recommended way to
 * read external state. SSR always sees an empty order; the client snapshot
 * hydrates seamlessly, and the order survives a page refresh.
 *
 * No backend, no payment — a future checkout step could consume `lines` /
 * `totalPrice` from here without any changes.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { siteConfig, type Product } from "@/lib/config/site";
import type { OrderLine } from "@/lib/types";

const STORAGE_KEY = "greenvaluefarms:order:v1";

/* ------------------------------------------------------------------ */
/* External store: productId -> quantity, persisted to localStorage.   */
/* ------------------------------------------------------------------ */

type Quantities = Record<string, number>;

let cache: Quantities | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => {
    listener();
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Quantities {
  if (cache === null) {
    cache = readStoredOrder();
  }
  return cache;
}

function getServerSnapshot(): Quantities {
  return {};
}

function commit(next: Quantities) {
  cache = next;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    /* storage unavailable — order still works for the session */
  }
  emitChange();
}

function readStoredOrder(): Quantities {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Quantities;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/* Context + provider                                                  */
/* ------------------------------------------------------------------ */

interface OrderStore {
  /** Resolved order lines (product + qty), filtered to known products. */
  lines: OrderLine[];
  /** Total quantity of all items across every line. */
  totalItems: number;
  /** Total price of all items (sum of qty × unit price). */
  totalPrice: number;
  /** Add `qty` of a product to the order (merges with an existing line). */
  add: (productId: string, qty?: number) => void;
  /** Set the exact quantity for a product (0 removes the line). */
  setQty: (productId: string, qty: number) => void;
  /** Remove a product from the order entirely. */
  remove: (productId: string) => void;
  /** Empty the whole order. */
  clear: () => void;
  /** Whether the order summary sheet is open. */
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

const OrderContext = createContext<OrderStore | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const quantities = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((productId: string, qty = 1) => {
    commit({
      ...getSnapshot(),
      [productId]: (getSnapshot()[productId] ?? 0) + Math.max(0, qty),
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const next = { ...getSnapshot() };
    if (qty <= 0) delete next[productId];
    else next[productId] = qty;
    commit(next);
  }, []);

  const remove = useCallback((productId: string) => {
    const next = { ...getSnapshot() };
    delete next[productId];
    commit(next);
  }, []);

  const clear = useCallback(() => commit({}), []);

  const openSheet = useCallback(() => setIsOpen(true), []);
  const closeSheet = useCallback(() => setIsOpen(false), []);

  const lines = useMemo<OrderLine[]>(() => {
    const byId = new Map<string, Product>(
      siteConfig.products.map((p) => [p.id, p]),
    );
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

  const value = useMemo<OrderStore>(
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
    [lines, totalItems, totalPrice, add, setQty, remove, clear, isOpen, openSheet, closeSheet],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderStore {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return ctx;
}

/** Convenience lookup for a product by id (falls back to the first product). */
export function getProduct(productId: string): Product {
  return (
    siteConfig.products.find((p) => p.id === productId) ?? siteConfig.products[0]
  );
}