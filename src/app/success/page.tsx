"use client";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <main className="mx-auto max-w-2xl p-10 text-center">
            <h1 className="text-4xl font-extrabold text-green-600 mb-4">
                ✅ Payment Successful!
            </h1>
            <p className="text-purple-900 dark:text-purple-100 mb-6">
                Thank you for purchasing your art lesson! You’ll receive access shortly.
            </p>
            <Link
                href="/lessons"
                className="inline-block rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-white font-semibold hover:brightness-110 transition"
            >
                Back to Lessons
            </Link>
        </main>
    );
}
