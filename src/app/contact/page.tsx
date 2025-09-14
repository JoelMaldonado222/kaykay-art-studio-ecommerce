"use client";

import Navbar from "@/components/Navbar2";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            <Navbar />

            <section className="mx-auto max-w-2xl px-4 py-16">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Contact</h1>
                <p className="text-white/90 mb-8">
                    Have a question about lessons or ideas for new tutorials? Send a note!
                </p>

                <form
                    className="space-y-4 rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur"
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Thanks! (Form is a demo for now.)");
                    }}
                >
                    <label className="block">
                        <span className="block text-sm font-semibold mb-1">Name</span>
                        <input
                            type="text"
                            required
                            className="w-full rounded-lg border border-white/20 bg-white/80 px-3 py-2 text-purple-900 placeholder-purple-900/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            placeholder="Your name"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-sm font-semibold mb-1">Email</span>
                        <input
                            type="email"
                            required
                            className="w-full rounded-lg border border-white/20 bg-white/80 px-3 py-2 text-purple-900 placeholder-purple-900/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            placeholder="you@example.com"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-sm font-semibold mb-1">Message</span>
                        <textarea
                            required
                            rows={5}
                            className="w-full rounded-lg border border-white/20 bg-white/80 px-3 py-2 text-purple-900 placeholder-purple-900/60 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            placeholder="Tell us what you’re looking for…"
                        />
                    </label>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl border border-yellow-300/50 bg-yellow-300 px-5 py-3 font-semibold text-purple-900 shadow-md hover:brightness-110 transition"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </main>
    );
}
