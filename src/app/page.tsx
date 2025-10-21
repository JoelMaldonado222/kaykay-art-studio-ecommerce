"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar2";
import LessonCard from "@/components/LessonCard";
import SpanishLessonCard from "@/components/SpanishLessonCard";

// ✅ Shared lesson type
type Lesson = {
    id: string;
    title: string;
    youtube_url: string;
    image_path: string | null;
    level: string;
    language: string;
};

export default function HomePage() {
    const [englishLessons, setEnglishLessons] = useState<Lesson[]>([]);
    const [spanishLessons, setSpanishLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLessons() {
            try {
                const [enRes, esRes] = await Promise.all([
                    fetch("/api/get-lessons?lang=en"),
                    fetch("/api/get-lessons?lang=es"),
                ]);

                const [enData, esData] = await Promise.all([
                    enRes.json(),
                    esRes.json(),
                ]);

                // ✅ Fix: Handle wrapped data from backend ({ lessons: [...] })
                const englishArray: Lesson[] = Array.isArray(enData.lessons)
                    ? enData.lessons
                    : Array.isArray(enData)
                        ? enData
                        : [];

                const spanishArray: Lesson[] = Array.isArray(esData.lessons)
                    ? esData.lessons
                    : Array.isArray(esData)
                        ? esData
                        : [];

// ✅ Filter by language and limit to 3 for homepage
                const topEnglish: Lesson[] = englishArray
                    .filter((l: Lesson) => l.language?.toLowerCase() === "en")
                    .slice(0, 3);

                const topSpanish: Lesson[] = spanishArray
                    .filter((l: Lesson) => l.language?.toLowerCase() === "es")
                    .slice(0, 3);


                setEnglishLessons(topEnglish);
                setSpanishLessons(topSpanish);
            } catch (err) {
                console.error("Error loading homepage lessons:", err);
                setError("Unable to load lessons. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchLessons();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-600 text-white">
                <p className="text-xl text-yellow-300 animate-pulse">🎨 Loading lessons...</p>
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

            {/* ✅ Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight">
                    🎉 There is a Lesson for Everyone!
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-purple-100">
                    From cute characters to cool heroes! Explore fun, bite-sized tutorials made for kids & teens.
                </p>
            </div>

            {/* ✅ English Lessons */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                <h2 className="text-2xl font-extrabold tracking-tight text-yellow-300 mb-6 text-center">
                    Lessons in English 🇺🇸
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {englishLessons.map((l) => (
                        <LessonCard
                            key={l.id}
                            lessonId={l.id}
                            title={l.title}
                            href={l.youtube_url}
                            imageSrc={l.image_path || ""}
                            level={l.level || "Beginner"}
                        />
                    ))}
                </div>
            </section>

            {/* ✅ Divider */}
            <section className="bg-gradient-to-b from-fuchsia-700 via-purple-700 to-purple-900 py-16 my-12 rounded-2xl shadow-xl">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300">
                        ✨ Draw. Create. Share. ✨
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-purple-100">
                        Every drawing starts with a single line. Keep practicing, and you’ll be amazed at what you can create! 🎨
                    </p>
                </div>
            </section>

            {/* ✅ Spanish Lessons */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                <h2 className="text-2xl font-extrabold tracking-tight text-yellow-300 mb-6 text-center">
                    Lecciones en Español 🇪🇸
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {spanishLessons.map((l) => (
                        <SpanishLessonCard
                            key={l.id}
                            lessonId={l.id}
                            title={l.title}
                            href={l.youtube_url}
                            imageSrc={l.image_path || ""}
                            level={l.level || "Principiante"}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
