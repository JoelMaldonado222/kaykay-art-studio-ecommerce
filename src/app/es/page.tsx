import Navbar from "@/components/Navbar2";
import SpanishLessonCard from "@/components/SpanishLessonCard";

const spanishLessons  = [
    {
        title: "Cómo Dibujar Labubu",
        description: "Personaje lindo con formas simples y contornos marcados.",
        href: "https://www.youtube.com/watch?v=2NjhRPGtOng&t=7s",
        imageSrc: "/LaBuBuSpanish.png", // from /public
        level: "Principiante" as unknown as "Beginner",
    },
    {
        title: "Cómo Dibujar Zoey (K-POP Demon Hunters)",
        description: "Proporciones faciales y ojos expresivos paso a paso.",
        href: "https://www.youtube.com/watch?v=qTK_xMR-9SY&t=8s",
        imageSrc: "/ZoeySpanish.png",
        level: "Intermedio" as unknown as "Intermediate",
    },
    {
        title: "Cómo Dibujar Lilo",
        description: "Cabello y poses básicas con pasos fáciles de seguir.",
        href: "https://www.youtube.com/watch?v=nHpjJTDdYrg&t=10s",
        imageSrc: "/Lilopsanish.png", // make sure filename matches exactly in /public
        level: "Intermedio" as unknown as "Intermediate",
    },
    {
        title: "Cómo Dibujar Bluey",
        description: "Perro divertido con colores brillantes y formas fáciles.",
        href: "https://www.youtube.com/watch?v=Zv0QXATh-S8", // placeholder
        imageSrc: "/blueySpanish.png", // add this to /public if you have it
        level: "Principiante" as unknown as "Beginner",
    },
    {
        title: "Cómo Dibujar Tails (Sonic)",
        description: "Dibuja al zorro de dos colas con detalles divertidos.",
        href: "https://www.youtube.com/watch?v=_ydhG8O53r4&t=2s",
        imageSrc: "/TailsSpanish.png",
        level: "Principiante" as unknown as "Beginner",
    },
    {
        title: "Cómo Dibujar Peppa Pig",
        description: "Un clásico personaje infantil con formas simples.",
        href: "https://www.youtube.com/watch?v=NUkYfsjpHgY",
        imageSrc: "/PeppaSpanish.png",
        level: "Principiante" as unknown as "Beginner",
    },
];

export default function SpanishLibraryPage() {
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
                        Lecciones cortas y divertidas para niños y jóvenes. ¡Haz clic en una tarjeta para ver el tutorial en YouTube!
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {spanishLessons.map((l) => (
                        <SpanishLessonCard key={l.title} {...l} />
                    ))}
                </div>
            </section>
        </main>
    );
}
