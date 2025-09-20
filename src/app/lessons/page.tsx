// src/app/lessons/page.tsx
import Navbar from "@/components/Navbar2";
import LessonCard from "@/components/LessonCard";


const lessons = [
    {
        title: "How to Draw Labubu",
        description: "Cute character with simple shapes and bold outlines.",
        href: "https://www.youtube.com/watch?v=2NjhRPGtOng&t=10s",
        imageSrc: "/LaBuBuEnglish.png",
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Zoey (K-POP Demon Hunters)",
        description: "Focus on face proportions and expressive eyes.",
        href: "https://www.youtube.com/watch?v=yfB0wlHaIJg&t=11s",
        imageSrc: "/ZoeyEnglish.png",
        level: "Intermediate" as const,
    },
    {
        title: "How to Draw Lilo",
        description: "Clean steps with hair flow and pose basics.",
        href: "https://www.youtube.com/watch?v=3LJI6gPkcj0&t=712s",
        imageSrc: "/LiloEnglish.png",
        level: "Intermediate" as const,
    },
    {
        title: "How to Draw Mickey Mouse",
        description: "Classic Disney character with bold outlines and friendly shapes.",
        href: "https://www.youtube.com/watch?v=uYHiEUuTNA8",
        imageSrc: "/MickeyMouseEnglish.png",
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Joy (Inside Out)",
        description: "Expressive emotions with bright colors and playful features.",
        href: "https://www.youtube.com/watch?v=Czu0TprmKko&t=42s",
        imageSrc: "/Joy.png",
        level: "Intermediate" as const,
    },
    {
        title: "How to Draw Mega Dave (Minion)",
        description: "Fun Minion design with goggles, overalls, and cheeky grin.",
        href: "https://www.youtube.com/watch?v=X1385akccbo",
        imageSrc: "/MegaDave.png",
        level: "Beginner" as const,
    },
];


export default function LessonsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            <Navbar />

            {/* ENGLISH LIBRARY */}
            <section id="english" className="mx-auto max-w-6xl px-4 py-12 scroll-mt-24">
                {/* Library header */}
                <div className="text-center mb-8">
          <span className="inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300 tracking-wide">
            Library · English
          </span>

                    <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight">
                        📚 Your Drawing Library
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-purple-100">
                        Pick a lesson and start drawing. Short, kid-friendly tutorials with clear steps.
                    </p>

                    {/* playful divider */}
                    <div className="relative mt-8">
                        <div className="border-t border-yellow-400/30"></div>
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-800 px-3 text-sm font-semibold text-yellow-300 rounded-md">
              🎨 Start Here
            </span>
                    </div>
                </div>

                {/* Cards grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {lessons.map((l) => (
                        <LessonCard key={l.title} {...l} />
                    ))}
                </div>
            </section>
        </main>
    );
}
