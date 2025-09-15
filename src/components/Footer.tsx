"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-white/10 bg-purple-900/40">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm text-white/80">
                    © {new Date().getFullYear()} <span className="font-semibold">{`KayKay's Art Studio`}</span>. All rights reserved.
                </p>

                <nav className="flex gap-4 text-sm">
                    <Link href="/" className="hover:text-white text-white/90">Home</Link>
                    <Link href="/lessons" className="hover:text-white text-white/90">Lessons</Link>
                    <Link href="/contact" className="hover:text-white text-white/90">Contact</Link>
                </nav>
            </div>
        </footer>
    );
}
