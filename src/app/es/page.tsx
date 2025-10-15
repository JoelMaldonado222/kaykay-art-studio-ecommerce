"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar2";
import SpanishLessonCard from "@/components/SpanishLessonCard";

export default function SpanishLibraryPage() {
    const [lessons, setLessons] = useState<any[]>([]);

    useEffect(() => {
        async function loadLessons() {
            try {
                const res = await fetch("/api/get-lessons?lang=es");
                const data = await res.json();
                setLessons(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                console.error("Error loading Spanish lessons:", err);
            }
        }
        loadLessons();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            <Navbar />

            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="text-center mb-8">
          <span className="inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300 tracking-wide">
            Biblioteca · Español
          </span>

                    <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight">
                        📚 Lecciones en Español
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-purple-100">
                        Lecciones cortas y divertidas para niños y jóvenes. ¡Haz clic en una
                        tarjeta para ver el tutorial en YouTube!
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {lessons.length > 0 ? (
                        lessons.map((l) => (
                            <SpanishLessonCard
                                key={l.id || l.title}
                                title={l.title}
                                href={l.youtube_url}
                                imageSrc={l.image_path}
                                level={l.is_paid ? "Avanzado" : "Principiante"}
                                lessonId={l.id}
                            />
                        ))
                    ) : (
                        <p className="text-center text-purple-200">Cargando lecciones...</p>
                    )}
                </div>
            </section>
        </main>
    );
}
