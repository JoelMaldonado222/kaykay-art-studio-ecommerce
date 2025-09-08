"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar2() {
    const [open, setOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/lessons", label: "Lessons" },
        { href: "#spanish", label: "Español" },
        { href: "#contact", label: "Contact" },
    ];

    return (
< header className="
  sticky top-0 z-50 w-full
  bg-gradient-to-r from-purple-950/80 to-violet-900/80
  backdrop-blur supports-[backdrop-filter]:bg-purple-950/20
  border-b-2 border-yellow-400/60
"

>
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl">
            KayKay’s Art Studio
          </span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden items-center gap-6 sm:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className="text-sm font-semibold text-white/90 hover:text-white"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 sm:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    {/* Hamburger / Close icons (inline SVGs) */}
                    {!open ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                            <path d="M18.3 5.7 12 12m0 0-6.3 6.3M12 12l6.3 6.3M12 12 5.7 5.7" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile panel */}
            {open && (
                <div className="sm:hidden border-t border-white/10 bg-purple-900/95">
                    <ul className="mx-auto max-w-6xl px-4 py-3 space-y-2">
                        {links.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-md px-3 py-2 text-base font-semibold text-white hover:bg-white/10"
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
