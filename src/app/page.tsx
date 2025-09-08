import Navbar from "@/components/Navbar2";
import LessonCard from "@/components/LessonCard";

const featured = [
    {
        title: "How to Draw Princess Peach !",
        description: "Easy, step-by-step drawing for kids. Bold lines, simple shapes.",
        href: "/lessons/princess-peach",
        imageSrc: "/lessons/princess-peach.png",
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Mario !",
        description: "Learn proportions and face details with a fun styles.",
        href: "/lessons/mario",
        imageSrc: "/lessons/mario.png",
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Mira (K-Pop Demon Hunters)",
        description: "Trendy character with clean, easy-to-follow steps.",
        href: "/lessons/mira",
        imageSrc: "/lessons/mira.png",
        level: "Intermediate" as const,
    },
];

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-6">
                <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 text-yellow-300">
                    Learn to Draw with KayKay{"'"}s Art Studio 🎨
                </h1>
                <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl">
                    Fun step-by-step drawing lessons for kids & teens!
                </p>
                <button className="bg-yellow-400 text-purple-900 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                    Get Started
                </button>
            </section>


            {/* Featured Lessons */}
            <section aria-labelledby="featured-lessons" className="mx-auto max-w-6xl px-4 pb-16">
                <h2
                    id="featured-lessons"
                    className="mb-6 text-2xl font-extrabold tracking-tight text-white"
                >
                    Featured Lessons
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((l) => (
                        <LessonCard key={l.title} {...l} />
                    ))}
                </div>
            </section>
        </main>
    );
}
