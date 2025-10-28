"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        setSuccess("✅ Account created! Please check your email for verification.");
        setTimeout(() => router.push("/login"), 2500);
    };

    return (
        <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-b from-purple-950 to-violet-900 text-white">
            {/* soft spotlight */}
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_40%_at_50%_20%,rgba(255,255,255,0.10),transparent_60%)]" />

            {/* floating color blobs */}
            <motion.div
                aria-hidden
                className="absolute -top-28 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl"
                animate={{ y: [0, 10, 0], x: [0, 8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl"
                animate={{ y: [0, -12, 0], x: [0, -6, 0] }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />

            {/* subtle grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            {/* content */}
            <section className="relative mx-auto flex max-w-md flex-col items-stretch justify-center px-6 py-16">
                <div className="mx-auto mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
            <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-90">
              <path
                  fill="currentColor"
                  d="M12 2l1.8 4.7L18 8.5l-4.2 1.8L12 15l-1.8-4.7L6 8.5l4.2-1.8z"
              />
            </svg>
            Join the Studio
          </span>
                </div>

                <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent">
            Sign Up
          </span>
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-purple-100"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-purple-200/60 shadow-inner outline-none transition focus:border-fuchsia-300/60 focus:bg-white/15 focus:ring-2 focus:ring-fuchsia-400/60"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="mb-1.5 block text-sm font-medium text-purple-100"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-purple-200/60 shadow-inner outline-none transition focus:border-fuchsia-300/60 focus:bg-white/15 focus:ring-2 focus:ring-fuchsia-400/60"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}
                    {success && (
                        <p className="text-green-400 text-sm mb-3 text-center">{success}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl border border-purple-600/40 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                    <p className="mt-4 text-center text-sm text-purple-100/80">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-yellow-300 hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    );
}
