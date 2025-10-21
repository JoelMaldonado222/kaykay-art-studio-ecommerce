"use client";
import Link from "next/link";

export default function CancelPage() {
    return (
        <main className="mx-auto max-w-2xl p-10 text-center">
            <h1 className="text-4xl font-extrabold text-red-600 mb-4">
                ❌ Payment Canceled
            </h1>
            <p className="text-purple-900 dark:text-purple-100 mb-6">
                No worries — your cart is still saved if you’d like to try again.
            </p>
            <Link
                href="/cart"
                className="inline-block rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-white font-semibold hover:brightness-110 transition"
            >
                Return to Cart
            </Link>
        </main>
    );
}
