"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

export type CartItem = {
    id: string;
    title: string;
    imageSrc?: string;
    href?: string;
    price?: number;
    qty?: number;
};

export type CartCtx = {
    items: CartItem[];
    count: number;
    total: number;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // hydrate from localStorage (frontend only)
    useEffect(() => {
        try {
            const saved = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
            if (saved) setItems(JSON.parse(saved));
        } catch {
            // ignore corrupted storage
        }
    }, []);

    // persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(items));
        } catch {
            // storage might be unavailable (private mode, etc.)
        }
    }, [items]);

    const addItem = (item: CartItem) => {
        setItems((prev) => {
            const idx = prev.findIndex((p) => p.id === item.id);
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = { ...copy[idx], qty: (copy[idx].qty ?? 1) + 1 };
                return copy;
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
    const clearCart = () => setItems([]);

    const count = useMemo(() => items.reduce((s, it) => s + (it.qty ?? 1), 0), [items]);
    const total = useMemo(() => items.reduce((s, it) => s + (it.price ?? 0) * (it.qty ?? 1), 0), [items]);

    return (
        <CartContext.Provider value={{ items, count, total, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
};
