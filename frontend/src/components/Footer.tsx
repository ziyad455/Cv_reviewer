export default function Footer() {
    return (
        <footer className="bg-white py-12 border-t border-[#135bec]/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#135bec] rounded-lg flex items-center justify-center">
                        <span className="material-icons text-white text-sm">description</span>
                    </div>
                    <span className="font-bold text-slate-900">CV Reviewer</span>
                </div>
                <p className="text-sm text-slate-500">© 2026 CV Reviewer AI. All rights reserved.</p>
                <div className="flex gap-6 text-sm text-slate-500 font-medium">
                    <a className="hover:text-[#135bec]" href="#">Privacy Policy</a>
                    <a className="hover:text-[#135bec]" href="#">Terms of Service</a>
                    <a className="hover:text-[#135bec]" href="#">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}
