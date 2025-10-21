"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar2";
import SpanishLessonCard from "@/components/SpanishLessonCard";

// ✅ Shared type for consistency
type Lesson = {
    id: string;
    title: string;
    youtube_url: string;
    image_path: string | null;
    level: string;
    language?: string;
    is_paid?: boolean;
};

export default function SpanishLibraryPage() {
    const [spanishLessons, setSpanishLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchSpanishLessons() {
            try {
                const res = await fetch("/api/get-lessons?lang=es");
                if (!res.ok) throw new Error("Failed to fetch Spanish lessons");
                const data = await res.json();

                const lessonsArray: Lesson[] = Array.isArray(data.lessons)
                    ? data.lessons
                    : Array.isArray(data)
                        ? data
                        : [];

                const filtered = lessonsArray.filter(
                    (l: Lesson) => l.language?.toLowerCase() === "es"
                );

                setSpanishLessons(filtered);
            } catch (err) {
                console.error("Error loading Spanish lessons:", err);
                setError("No se pudieron cargar las lecciones. Inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        }

        fetchSpanishLessons();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-600 text-white">
                <p className="text-xl text-yellow-300 animate-pulse">
                    🎨 Cargando lecciones...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-600 text-white">
                <p className="text-xl text-red-400">{error}</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            <Navbar />

            {/* ✅ Spanish Library Header */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="text-center mb-8">
                    <span className="inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300 tracking-wide">
                        Biblioteca · Español
                    </span>

                    <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight">
                        📚 Lecciones en Español
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-purple-100">
                        Lecciones cortas, fáciles y divertidas para niños y jóvenes.
                        ¡Haz clic en una tarjeta para ver el tutorial completo en YouTube! 🎨
                    </p>

                    {/* Divider line for consistency */}
                    <div className="relative mt-8">
                        <div className="border-t border-yellow-400/30"></div>
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-800 px-3 text-sm font-semibold text-yellow-300 rounded-md">
                            🎨 Empieza Aquí
                        </span>
                    </div>
                </div>

                {/* ✅ Dynamic Spanish Lesson Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {spanishLessons.length > 0 ? (
                        spanishLessons.map((l) => (
                            <SpanishLessonCard
                                key={l.id}
                                lessonId={l.id}
                                title={l.title}
                                href={l.youtube_url}
                                imageSrc={l.image_path || ""}
                                level={l.level || (l.is_paid ? "Avanzado" : "Principiante")}
                            />
                        ))
                    ) : (
                        <p className="text-center text-purple-200">
                            No hay lecciones disponibles en este momento.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
