"use client";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Footer() {
    const supabase = createClientComponentClient();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            window.location.href = "/"; // Redirect home after logout
        } catch (error) {
            console.error("Logout failed:", error);
            alert("There was a problem logging out.");
        }
    };

    return (
        <footer className="mt-16 border-t border-white/10 bg-purple-900/40">
            <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
                {/* Left side: copyright */}
                <p className="text-sm text-white/80 text-center sm:text-left">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold">{`KayKay's Art Studio`}</span>. All rights reserved.
                </p>

                {/* Right side: nav + logout */}
                <nav className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <Link href="/lessons" className="hover:text-white">Lessons</Link>
                    <Link href="/contact" className="hover:text-white">Contact</Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="rounded-md border border-fuchsia-400/40 bg-fuchsia-600/20 px-3 py-1 text-sm font-semibold text-fuchsia-200 hover:bg-fuchsia-500/30 hover:text-white transition"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </footer>
    );
}
