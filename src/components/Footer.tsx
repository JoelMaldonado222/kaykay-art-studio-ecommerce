export default function Footer() {
    return (
        <footer className="mt-16 border-t border-white/10 bg-purple-950/60 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p>© {new Date().getFullYear()} KayKay’s Art Studio. All rights reserved.</p>
                <nav className="flex gap-4">
                    <a href="/" className="hover:text-white">Home</a>
                    <a href="/lessons" className="hover:text-white">Lessons</a>
                    <a href="/contact" className="hover:text-white">Contact</a>
                </nav>
            </div>
        </footer>
    );
}
