"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar2";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { items, count, removeItem, clear } = useCart();

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            <Navbar />

            <section className="mx-auto max-w-4xl px-4 py-12">
                <h1 className="text-3xl font-extrabold text-yellow-300 mb-2">Your Cart</h1>
                <p className="text-purple-100 mb-8">{count} item{count === 1 ? "" : "s"}</p>

                {items.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-purple-900/40 p-8 text-center">
                        <p className="mb-4">Your cart is empty.</p>
                        <Link href="/lessons" className="rounded-xl bg-yellow-400 px-5 py-2 font-bold text-purple-900 hover:bg-yellow-300">
                            Browse Lessons
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {items.map((it) => (
                                <li key={it.id} className="flex items-center gap-4 rounded-xl border border-white/10 bg-purple-900/40 p-4">
                                    {it.imageSrc && (
                                        <Image src={it.imageSrc} alt={it.title} width={96} height={54} className="rounded-md object-cover" />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-bold">{it.title}</h3>
                                        <p className="text-sm text-purple-200">Qty: {it.qty}</p>
                                        {it.href?.startsWith("http") && (
                                            <a href={it.href} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-300 underline">
                                                Watch on YouTube
                                            </a>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeItem(it.id)}
                                        className="rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/10"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 flex items-center justify-between">
                            <button onClick={clear} className="rounded-md border border-white/20 px-4 py-2 hover:bg-white/10">
                                Clear Cart
                            </button>
                            {/* Placeholder checkout */}
                            <button className="rounded-xl bg-yellow-400 px-5 py-2 font-bold text-purple-900 hover:bg-yellow-300">
                                Checkout (demo)
                            </button>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
