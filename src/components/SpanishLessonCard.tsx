"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

type LessonCardProps = {
    title: string;
    href?: string; //
    imageSrc?: string;
    level: string;
    lessonId?: string;
};

export default function SpanishLessonCard({
                                              title,
                                              href,
                                              imageSrc,
                                              level = "Principiante",
                                          }: LessonCardProps) {
    const isExternal = href && href.startsWith("http");
    const { addItem } = useCart();
    const id = title.toLowerCase().replace(/\s+/g, "-");

    return (
        <motion.article
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group relative overflow-hidden rounded-2xl border border-purple-300/30 bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:bg-purple-950/40"
        >
            {/* Imagen del tutorial */}
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-200 to-fuchsia-300 dark:from-purple-800 dark:to-fuchsia-700">
                <Image
                    src={imageSrc || "/placeholder.png"}
                    alt={title}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    priority
                />
            </div>

            {/* Contenido del card */}
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

                {/* ✅ Botones: Añadir al carrito + Ver en YouTube o Coming Soon */}
                <div className="flex gap-2">
                    <button
                        onClick={() => addItem({ id, title, imageSrc, href })}
                        className="inline-flex items-center justify-center rounded-xl border border-yellow-400/40 bg-yellow-400 px-3 py-2 text-sm font-semibold text-purple-900 shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                        Añadir al carrito
                    </button>

                    {href ? (
                        isExternal ? (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-xl border border-purple-600/30 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                Ver en YouTube
                            </a>
                        ) : (
                            <Link
                                href={href}
                                className="inline-flex items-center justify-center rounded-xl border border-purple-600/30 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                Ver lección
                            </Link>
                        )
                    ) : (
                        <button
                            disabled
                            className="inline-flex items-center justify-center rounded-xl border border-gray-400 bg-gray-400 text-white px-4 py-2 text-sm font-semibold opacity-70 cursor-not-allowed"
                        >
                            Próximamente
                        </button>
                    )}
                </div>

                {/* Notas explicativas */}
                <p className="mt-2 text-xs text-purple-200/80">
                    🎥 <span className="font-semibold">Ver en YouTube</span> = Vista previa gratis <br />
                    🛒 <span className="font-semibold">Añadir al carrito</span> = Lección completa de pago con pasos guiados
                </p>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rotate-12 rounded-full bg-fuchsia-400/40 blur-3xl" />
        </motion.article>
    );
}
