export default function Navbar2() {
    return (
        <nav className="flex items-center justify-between p-6 bg-purple-700 text-white shadow-md">
            {/* Left side: Logo */}

            <div className="flex items-center gap-2">
                <span className="text-3xl leading-none align-middle">🖌️</span>
                <span className="font-black text-2xl md:text-3xl bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
        KayKay’s Art Studio
      </span>
            </div>
            <p className="text-lg bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent ml-10 font-large">
                Learn to draw with Kay Kay's Art Studio
            </p>

    {/* Right side: Nav Links */}
    <ul className="flex gap-6 text-lg">
    <li><a href="#" className="hover:text-yellow-300">Home</a></li>
    <li><a href="#" className="hover:text-yellow-300">Lessons</a></li>
    <li><a href="#" className="hover:text-yellow-300">About</a></li>
    <li><a href="#" className="hover:text-yellow-300">Login</a></li>
    </ul>
    </nav>
);
}
