"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
    { href: "/", label: "Home" },
    { href: "/lessons", label: "Lessons" },
    { href: "/es", label: "Español" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar2() {
    const [open, setOpen] = useState(false);

    return (
        <header
            className="
        sticky top-0 z-50 w-full
        bg-gradient-to-r from-purple-950/80 to-violet-900/80
        backdrop-blur supports-[backdrop-filter]:bg-purple-950/20
        border-b-2 border-yellow-400/60
      "
        >
            {/* Full-width nav (brand left, links right) */}
            <nav className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-3xl">🎨</span>
                    <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl tracking-tight">
            KayKay’s Art Studio
          </span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden items-center gap-8 sm:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className="text-lg font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button (inline SVG icons) */}
                <button
                    type="button"
                    className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-yellow-300 hover:bg-purple-800/50"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? (
                        // X icon
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile dropdown */}
            {open && (
                <div className="sm:hidden border-t border-white/10 bg-purple-900/95">
                    <ul className="space-y-2 px-4 py-3">
                        {links.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-purple-800/50"
                                    onClick={() => setOpen(false)}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
