"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/auth-context";

export type CartSize = "500g" | "1kg";

export interface CartItem {
  productId: string;
  size: CartSize;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  /** Total number of packs across the cart (nav badge). */
  count: number;
  loading: boolean;
  addItem: (productId: string, size: CartSize, delta?: number) => void;
  setQty: (productId: string, size: CartSize, qty: number) => void;
  removeItem: (productId: string, size: CartSize) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const GUEST_KEY = "gm-box"; // prototype storage contract: "productId__size" -> qty

/* ----------------------------- guest storage ----------------------------- */

function readGuest(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(GUEST_KEY) || "{}") as Record<
      string,
      number
    >;
    return Object.entries(raw)
      .map(([key, qty]) => {
        const [productId, size] = key.split("__");
        return { productId, size: size as CartSize, qty: Number(qty) || 0 };
      })
      .filter((i) => i.productId && i.qty > 0);
  } catch {
    return [];
  }
}

function writeGuest(items: CartItem[]) {
  if (typeof window === "undefined") return;
  const map: Record<string, number> = {};
  for (const i of items) if (i.qty > 0) map[`${i.productId}__${i.size}`] = i.qty;
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify(map));
  } catch {
    /* storage may be unavailable — non-fatal */
  }
}

function clearGuest() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(GUEST_KEY);
  } catch {
    /* non-fatal */
  }
}

/* -------------------------------- provider ------------------------------- */

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [supabase] = useState<SupabaseClient | null>(() => createClient());
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const mergedFor = useRef<string | null>(null);

  const authed = Boolean(user && supabase);

  const loadFromDb = useCallback(async () => {
    if (!supabase || !user) return;
    setLoading(true);
    const { data } = await supabase
      .from("cart_items")
      .select("product_id, size, qty")
      .eq("user_id", user.id);
    setItems(
      (data ?? []).map((r) => ({
        productId: r.product_id as string,
        size: r.size as CartSize,
        qty: r.qty as number,
      }))
    );
    setLoading(false);
  }, [supabase, user]);

  // Guest ↔ authed transitions.
  useEffect(() => {
    if (!authed) {
      // Signed out: guest cart is the source of truth.
      mergedFor.current = null;
      setItems(readGuest());
      return;
    }
    if (!user || !supabase) return;
    if (mergedFor.current === user.id) return;
    mergedFor.current = user.id;

    // Signed in: merge the guest cart into cart_items, then read back.
    (async () => {
      setLoading(true);
      const guest = readGuest();
      if (guest.length) {
        const { data: existing } = await supabase
          .from("cart_items")
          .select("product_id, size, qty")
          .eq("user_id", user.id);
        const merged = new Map<string, number>();
        for (const r of existing ?? [])
          merged.set(`${r.product_id}__${r.size}`, r.qty as number);
        for (const g of guest)
          merged.set(
            `${g.productId}__${g.size}`,
            (merged.get(`${g.productId}__${g.size}`) ?? 0) + g.qty
          );
        const rows = Array.from(merged.entries()).map(([key, qty]) => {
          const [product_id, size] = key.split("__");
          return { user_id: user.id, product_id, size, qty };
        });
        await supabase
          .from("cart_items")
          .upsert(rows, { onConflict: "user_id,product_id,size" });
        clearGuest();
      }
      await loadFromDb();
    })();
  }, [authed, user, supabase, loadFromDb]);

  /* ------------------------------ mutations ------------------------------ */

  const persistGuest = useCallback((next: CartItem[]) => {
    writeGuest(next);
    return next;
  }, []);

  const addItem = useCallback(
    (productId: string, size: CartSize, delta = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === productId && i.size === size
        );
        const nextQty = (idx >= 0 ? prev[idx].qty : 0) + delta;
        let next: CartItem[];
        if (nextQty <= 0) {
          next = prev.filter(
            (i) => !(i.productId === productId && i.size === size)
          );
        } else if (idx >= 0) {
          next = prev.map((i, k) => (k === idx ? { ...i, qty: nextQty } : i));
        } else {
          next = [...prev, { productId, size, qty: nextQty }];
        }

        if (authed && supabase && user) {
          if (nextQty <= 0) {
            void supabase
              .from("cart_items")
              .delete()
              .match({ user_id: user.id, product_id: productId, size });
          } else {
            void supabase.from("cart_items").upsert(
              { user_id: user.id, product_id: productId, size, qty: nextQty },
              { onConflict: "user_id,product_id,size" }
            );
          }
          return next;
        }
        return persistGuest(next);
      });
    },
    [authed, supabase, user, persistGuest]
  );

  const setQty = useCallback(
    (productId: string, size: CartSize, qty: number) => {
      setItems((prev) => {
        let next: CartItem[];
        if (qty <= 0) {
          next = prev.filter(
            (i) => !(i.productId === productId && i.size === size)
          );
        } else if (prev.some((i) => i.productId === productId && i.size === size)) {
          next = prev.map((i) =>
            i.productId === productId && i.size === size ? { ...i, qty } : i
          );
        } else {
          next = [...prev, { productId, size, qty }];
        }

        if (authed && supabase && user) {
          if (qty <= 0) {
            void supabase
              .from("cart_items")
              .delete()
              .match({ user_id: user.id, product_id: productId, size });
          } else {
            void supabase.from("cart_items").upsert(
              { user_id: user.id, product_id: productId, size, qty },
              { onConflict: "user_id,product_id,size" }
            );
          }
          return next;
        }
        return persistGuest(next);
      });
    },
    [authed, supabase, user, persistGuest]
  );

  const removeItem = useCallback(
    (productId: string, size: CartSize) => setQty(productId, size, 0),
    [setQty]
  );

  const clear = useCallback(() => {
    setItems([]);
    if (authed && supabase && user) {
      void supabase.from("cart_items").delete().eq("user_id", user.id);
    } else {
      clearGuest();
    }
  }, [authed, supabase, user]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, count, loading, addItem, setQty, removeItem, clear }),
    [items, count, loading, addItem, setQty, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a <CartProvider>");
  return ctx;
}
