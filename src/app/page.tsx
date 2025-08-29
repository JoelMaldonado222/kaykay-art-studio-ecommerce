import Navbar from "@/components/Navbar2";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 text-white">
            {/* Navbar */}
            <Navbar/>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-6">
                <h1 className="text-5xl font-extrabold mb-6 text-yellow-300">
                    Learn to Draw with KayKay{"'"}s Art Studio 🎨
                </h1>
                <p className="text-xl mb-8 max-w-2xl">
                    Fun step-by-step drawing lessons for kids & teens !
                </p>
                <button className="bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                    Get Started
                </button>
            </section>
        </div>
    );
}