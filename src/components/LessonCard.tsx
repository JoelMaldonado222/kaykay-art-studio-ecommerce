"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

type LessonCardProps = {
    id?: string;                  // optional local slug (kept for UI keying)
    lessonId?: string;            // ✅ real Supabase UUID for backend
    title: string;
    href: string;                 // internal (/lessons/...) or external (YouTube)
    imageSrc?: string;
    level: string;


};

export default function LessonCard({
                                       id,
                                       lessonId,                     // ✅ new prop
                                       title,
                                       href,
                                       imageSrc,
                                       level = "Beginner",
                                   }: LessonCardProps) {
    const isExternal = href.startsWith("http");
    const { addItem } = useCart();

    // fallback local id if none provided (used only for client cart state)
    const localId = id ?? title.toLowerCase().replace(/\s+/g, "-");

    async function handleAddToCart() {
        // 1) update local cart state (for UI)
        addItem({ id: localId, title, imageSrc, href });

        // 2) sync to backend only if we have a real UUID
        if (!lessonId) return; // no backend write if this card isn't tied to DB yet

        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: "00000000-0000-0000-0000-000000000001", // temp dev user
                    lesson_id: lessonId,                             // ✅ real UUID
                    quantity: 1,
                }),
            });

            const json = await res.json();
            if (!res.ok) {
                console.error("Cart API error:", json.error || json);
            }
        } catch (err) {
            console.error("Failed to sync cart:", err);
        }
    }

    return (
        <motion.article
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group relative overflow-hidden rounded-2xl border border-purple-300/30 bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-purple-950/40"
        >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-200 to-fuchsia-300 dark:from-purple-800 dark:to-fuchsia-700">
                <Image
                    src={imageSrc || "/LiloEnglish.png"}
                    alt={title}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    priority
                />
            </div>

            <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
          <span className="rounded-full bg-purple-600/10 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:text-purple-200">
            {level}
          </span>
                    {isExternal && (
                        <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600">
              YouTube
            </span>
                    )}
                </div>

                <h3 className="text-lg font-extrabold tracking-tight text-purple-900 dark:text-purple-50">
                    {title}
                </h3>

                <p className="text-sm text-gray-700 dark:text-purple-100/80">{}</p>

                <div className="flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        className="inline-flex items-center justify-center rounded-xl border border-yellow-400/40 bg-yellow-400 px-3 py-2 text-sm font-semibold text-purple-900 shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                        Add to Cart
                    </button>

                    {isExternal ? (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl border border-purple-600/30 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            Watch on YouTube
                        </a>
                    ) : (
                        <Link
                            href={href}
                            className="inline-flex items-center justify-center rounded-xl border border-purple-600/30 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            View Lesson
                        </Link>
                    )}
                </div>

                <p className="mt-2 text-xs text-purple-200/80">
                    🎥 <span className="font-semibold">Watch on YouTube</span> = Free sample preview
                    <br />
                    🛒 <span className="font-semibold">Add to Cart</span> = Paid lesson with full guided steps
                </p>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rotate-12 rounded-full bg-fuchsia-400/40 blur-3xl" />
        </motion.article>
    );
}
