import Navbar from "@/components/Navbar2";
import LessonCard from "@/components/LessonCard";
import SpanishLessonCard from "@/components/SpanishLessonCard";

const lessons = [
    {
        title: "How to Draw Labubu",
        description: "Cute character with simple shapes and bold outlines.",
        href: "https://www.youtube.com/watch?v=2NjhRPGtOng&t=7s", // ← put real URL
        imageSrc: "/LaBuBuEnglish.png",
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Zoey",
        description: "Face proportions and expressive eyes, step-by-step.",
        href: "https://www.youtube.com/watch?v=yfB0wlHaIJg", // ← put real URL
        imageSrc: "/ZoeyEnglish.png",
        level: "Beginner" as const,
    },
    {
        title: "How to Draw Lilo",
        description: "Hair flow and pose basics with clean easy steps.",
        href: "https://www.youtube.com/watch?v=3LJI6gPkcj0", // ← put real URL
        imageSrc: "/LiloEnglish.png",
        level: "Intermediate" as const,
    },
];

const spanishLessons = [
    {
        title: "Cómo dibujar a Labubu",
        description: "Personaje tierno con formas simples y líneas gruesas.",
        href: "https://www.youtube.com/watch?v=FLZ5O7GQ3D4", // add later
        imageSrc: "/LaBuBuSpanish.png",
        level: "Principiante" as unknown as "Beginner", // visual pill; fine to map this way for now
    },
    {
        title: "Cómo dibujar a Zoey",
        description: "Proporciones del rostro y ojos expresivos, paso a paso.",
        href: "https://www.youtube.com/watch?v=qTK_xMR-9SY&t=8s", // add later
        imageSrc: "/ZoeySpanish.png",
        level: "Principiante" as unknown as "Beginner",
    },
    {
        title: "Cómo dibujar a Lilo",
        description: "Pasos claros con cabello en movimiento y poses básicas.",
        href: "https://www.youtube.com/watch?v=nHpjJTDdYrg&t=10s", // add later
        imageSrc: "/Lilopsanish.png",
        level: "Intermedio" as unknown as "Intermediate",
    },
];

export default function LessonsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            <Navbar />

            {/* Section Intro */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 tracking-tight">
                    🎉 There is a Lesson for Everyone!
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-purple-100">
                    From cute characters to cool heroes! Explore fun, bite-sized tutorials
                    made for kids & teens. ✏️ Click a card to start your next drawing adventure!
                </p>
            </div>


            {/* English Lessons */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                <h2 className="text-2xl font-extrabold tracking-tight text-yellow-300 mb-6 text-center">
                    Lessions In English 🇺🇸
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {lessons.map((l) => (
                        <LessonCard key={l.title} {...l} />
                    ))}
                </div>
            </section>

            {/* Fun Divider Section - Updated for better color flow */}
            <section className="bg-gradient-to-b from-fuchsia-700 via-purple-700 to-purple-900 py-16 my-12 rounded-2xl shadow-xl">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300">
                        ✨ Draw. Create. Share. ✨
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl text-purple-100">
                        Every drawing starts with a single line. Whether you love cute characters,
                        superheroes, or fun animals! We have something for you.
                        Keep practicing, and you'll be amazed at what you can create! 🎨
                    </p>
                    <button className="mt-6 px-6 py-3 bg-yellow-400 text-purple-900 font-bold rounded-xl shadow-lg hover:bg-yellow-300 transition">
                        Start Your Next Lesson
                    </button>
                </div>
            </section>


            {/* Spanish Lessons */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                <h2 className="text-2xl font-extrabold tracking-tight text-yellow-300 mb-6 text-center">
                    Lecciones en Español 🇪🇸
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {spanishLessons.map((l) => (   // <-- use spanishLessons here
                        <SpanishLessonCard key={l.title} {...l} />
                    ))}
                </div>
            </section>

        </main>
    );
}