export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#135bec]/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#135bec] rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white">description</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        CV<span className="text-[#135bec]">Reviewer</span>
                    </span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <a className="hover:text-[#135bec] transition-colors" href="#">How it Works</a>
                    <a className="hover:text-[#135bec] transition-colors" href="#">Pricing</a>
                    <a className="hover:text-[#135bec] transition-colors" href="#">Enterprise</a>
                    <a className="hover:text-[#135bec] transition-colors" href="#">Help</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#135bec] transition-colors">
                        Sign In
                    </button>
                    <button className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-[#135bec]/20">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}
