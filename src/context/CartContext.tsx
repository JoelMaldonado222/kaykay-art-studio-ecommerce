"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

export type CartItem = {
    id: string;
    lessonId?: string;
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

    // Generate or reuse dev user ID (temporary until auth)
    useEffect(() => {
        if (typeof window !== "undefined") {
            let devUserId = localStorage.getItem("dev_uid");
            if (!devUserId) {
                devUserId = crypto.randomUUID();
                localStorage.setItem("dev_uid", devUserId);
            }
        }
    }, []);

    // 🧠 Load from Supabase when app starts
    useEffect(() => {
        const loadCart = async () => {
            const devUserId = localStorage.getItem("dev_uid");
            if (!devUserId) return;

            try {
                const res = await fetch(`/api/cart?user_id=${devUserId}`);
                const json = await res.json();

                if (json?.items) {
                    const mapped = json.items.map((i: any) => ({
                        id: i.lesson?.id ?? i.lesson_id ?? i.id,
                        lessonId: i.lesson_id ?? i.id,
                        title: i.lesson?.title ?? "Untitled Lesson",
                        imageSrc: i.lesson?.image_path ?? i.lesson?.image ?? "/placeholder.png",
                        href: i.lesson?.youtube_url ?? "#",
                        qty: i.quantity ?? 1,
                        price: i.lesson?.price ?? 0,
                    }));
                    setItems(mapped);
                }
            } catch (err) {
                console.error("Failed to load cart:", err);
            }
        };
        loadCart();
    }, []);

    // 🧩 Save to localStorage (backup only)
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(items));
        } catch {
            /* ignore */
        }
    }, [items]);

    // ➕ Add item
    const addItem = async (item: CartItem) => {
        setItems((prev) => {
            const idx = prev.findIndex((p) => p.id === item.id);
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = { ...copy[idx], qty: (copy[idx].qty ?? 1) + 1 };
                return copy;
            }
            return [...prev, { ...item, qty: 1 }];
        });

        try {
            const devUserId = localStorage.getItem("dev_uid");
            if (!devUserId) return;

            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: devUserId,
                    lesson_id: item.lessonId ?? item.id,
                    quantity: 1,
                }),
            });

            const json = await res.json();
            if (!res.ok) console.error("Cart API error:", json.error || json);
        } catch (err) {
            console.error("Failed to sync cart:", err);
        }
    };

    // ➖ Remove one item
    const removeItem = async (id: string) => {
        setItems((prev) => prev.filter((p) => p.id !== id));

        try {
            const devUserId = localStorage.getItem("dev_uid");
            if (!devUserId) return;

            await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: devUserId, lesson_id: id }),
            });
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    // 🧹 Clear all items
    const clearCart = async () => {
        setItems([]);

        try {
            const devUserId = localStorage.getItem("dev_uid");
            if (!devUserId) return;

            await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: devUserId }),
            });
        } catch (err) {
            console.error("Failed to clear cart:", err);
        }
    };

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
