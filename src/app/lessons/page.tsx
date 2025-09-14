// src/app/lessons/page.tsx
import Navbar from "@/components/Navbar2";
import LessonCard from "@/components/LessonCard";

const lessons = [
    {
        title: "How to Draw Labubu",
        description: "Cute character with simple shapes and bold outlines.",
        href: "/lessons/labubu",
        imageSrc: "/lessons/labubu.png",   // ⬅️ added
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Zoey",
        description: "Focus on face proportions and expressive eyes.",
        href: "/lessons/zoey",
        imageSrc: "/lessons/zoey.png",     // ⬅️ added
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Lilo",
        description: "Clean steps with hair flow and pose basics.",
        href: "/lessons/lilo",
        imageSrc: "/lessons/lilo.png",     // ⬅️ added
        level: "Intermediate" as const,
    },
];


export default function LessonsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            <Navbar />
            <section className="mx-auto max-w-6xl px-4 py-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Lessons</h1>
                <p className="text-white/90 mb-8">
                    Browse all our step-by-step drawing lessons.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {lessons.map((l) => (
                        <LessonCard key={l.title} {...l} />
                    ))}
                </div>
            </section>
        </main>
    );
}
