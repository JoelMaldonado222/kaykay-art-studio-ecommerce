"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar2";
import LessonCard from "@/components/LessonCard";

// ✅ Lesson type definition
type Lesson = {
    id: string;
    title: string;
    youtube_url: string;
    image_path: string | null;
    level: string;
    language: string;
};

export default function LessonsPage() {
    const [englishLessons, setEnglishLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLessons() {
            try {
                const res = await fetch("/api/get-lessons?lang=en");
                const data = await res.json();

                // ✅ Support both wrapped and direct array response
                const lessonsArray: Lesson[] = Array.isArray(data.lessons)
                    ? data.lessons
                    : Array.isArray(data)
                        ? data
                        : [];

                // ✅ Filter English lessons just to be sure
                const filtered = lessonsArray.filter(
                    (l: Lesson) => l.language?.toLowerCase() === "en"
                );

                setEnglishLessons(filtered);
            } catch (err) {
                console.error("Error loading lessons:", err);
                setError("Unable to load lessons from Supabase");
            } finally {
                setLoading(false);
            }
        }

        fetchLessons();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-600 text-white">
                <p className="text-xl text-yellow-300 animate-pulse">
                    🎨 Loading lessons...
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

            {/* ENGLISH LIBRARY SECTION */}
            <section id="english" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
                <div className="text-center mb-8">
                    <span className="inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300 tracking-wide">
                        Library · English
                    </span>

                    <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight">
                        📚 Your Drawing Library
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-purple-100">
                        Pick a lesson and start drawing! Each tutorial is short,
                        kid-friendly, and teaches clear step-by-step drawing skills.
                    </p>

                    {/* playful divider */}
                    <div className="relative mt-8">
                        <div className="border-t border-yellow-400/30"></div>
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-800 px-3 text-sm font-semibold text-yellow-300 rounded-md">
                            🎨 Start Here
                        </span>
                    </div>
                </div>

                {/* ✅ Dynamic Cards from Supabase */}
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
        </main>
    );
}
