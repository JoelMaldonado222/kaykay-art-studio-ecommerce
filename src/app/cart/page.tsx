"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

export default function CartPage() {
    const cart = useCart(); // provider required
    const items: CartItem[] = cart.items ?? [];
    const removeItem = cart.removeItem ?? (() => {});
    const clearCart = cart.clearCart ?? (() => {});
    const total =
        cart.total ??
        items.reduce((s: number, it: CartItem) => s + (it.price ?? 0), 0);

    return (
        <main className="mx-auto max-w-4xl p-6">
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-purple-900 dark:text-purple-50">
                Your Cart
            </h1>

            {items.length === 0 ? (
                <div className="rounded-2xl border border-purple-300/30 bg-white/80 p-8 text-center dark:bg-purple-950/40">
                    <p className="mb-4 text-purple-900 dark:text-purple-100/80">
                        Your cart is empty.
                    </p>
                    <Link
                        href="/lessons"
                        className="inline-flex items-center justify-center rounded-xl border border-purple-600/30 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        Browse Lessons
                    </Link>
                </div>
            ) : (
                <>
                    <ul className="space-y-4">
                        {items.map((it: CartItem) => (
                            <li
                                key={it.id}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-purple-300/30 bg-white/80 p-4 dark:bg-purple-950/40"
                            >
                                <div className="flex items-center gap-4">
                                    {it.imageSrc ? (
                                        <Image
                                            src={it.imageSrc}
                                            alt={it.title}
                                            width={96}
                                            height={54}
                                            className="h-14 w-24 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="h-14 w-24 rounded-lg bg-gradient-to-br from-purple-200 to-fuchsia-300 dark:from-purple-800 dark:to-fuchsia-700" />
                                    )}
                                    <div>
                                        <p className="font-semibold text-purple-900 dark:text-purple-50">
                                            {it.title}
                                        </p>
                                        {typeof it.price === "number" && (
                                            <p className="text-sm text-purple-800/80 dark:text-purple-100/70">
                                                ${it.price.toFixed(2)}
                                            </p>
                                        )}
                                        {it.href && (
                                            <a
                                                href={it.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-fuchsia-700 underline hover:opacity-90 dark:text-fuchsia-300"
                                            >
                                                View lesson
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeItem(it.id)}
                                    className="rounded-xl border border-red-400/40 bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-900/40 dark:text-red-200"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex items-center justify-between rounded-2xl border border-purple-300/30 bg-white/80 p-4 dark:bg-purple-950/40">
                        <p className="text-lg font-bold text-purple-900 dark:text-purple-50">
                            Total: ${Number(total).toFixed(2)}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => clearCart()}
                                className="rounded-xl border border-yellow-400/40 bg-yellow-400 px-4 py-2 text-sm font-semibold text-purple-900 shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            >
                                Clear Cart
                            </button>
                            <button
                                disabled
                                className="cursor-not-allowed rounded-xl border border-purple-600/30 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white opacity-70"
                            >
                                Checkout (frontend only)
                            </button>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
