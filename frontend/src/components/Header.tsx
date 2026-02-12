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

            </div>
        </header>
    );
}
