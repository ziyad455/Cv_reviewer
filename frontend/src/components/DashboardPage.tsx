interface AnalysisResult {
    filename: string;
    analysis: {
        summary: string;
        skills: string;
        feedback: string;
    };
}

interface DashboardPageProps {
    result: AnalysisResult;
    onReset: () => void;
}

export default function DashboardPage({ result, onReset }: DashboardPageProps) {
    const { filename, analysis } = result;

    // Parse skills into categories (best effort from plain text)
    const skillLines = analysis.skills
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

    // Parse feedback into items
    const feedbackLines = analysis.feedback
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

    const feedbackIcons = [
        { bg: 'bg-emerald-100', text: 'text-emerald-600', icon: 'thumb_up' },
        { bg: 'bg-amber-100', text: 'text-amber-600', icon: 'priority_high' },
        { bg: 'bg-[#135bec]/10', text: 'text-[#135bec]', icon: 'search' },
        { bg: 'bg-slate-100', text: 'text-slate-600', icon: 'format_align_left' },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Top Status Bar */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Analysis Results</h1>
                    <p className="text-slate-500">
                        AI Review completed for <span className="font-medium">{filename}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                        onClick={onReset}
                    >
                        <span className="material-icons-outlined text-sm">upload_file</span>
                        Upload Another
                    </button>
                </div>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Column 1: Summary Card */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60">
                        <div className="flex flex-col items-center text-center">
                            {/* Circular Progress Visual */}
                            <div className="relative mb-4">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle
                                        className="text-slate-100"
                                        cx="64" cy="64" r="58"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        className="text-[#135bec]"
                                        cx="64" cy="64" r="58"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeDasharray="364.4"
                                        strokeDashoffset="54.6"
                                        strokeWidth="8"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-slate-900">85</span>
                                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Score</span>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">CV Analysis</h2>
                            <p className="text-[#135bec] font-medium text-sm">{filename}</p>
                        </div>

                        {/* Score Bars */}
                        <div className="mt-8 space-y-4">
                            <div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Readability</span>
                                    <span className="font-semibold text-slate-900">92%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1">
                                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center text-sm pt-2">
                                    <span className="text-slate-500">Keywords Match</span>
                                    <span className="font-semibold text-slate-900">78%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1">
                                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center text-sm pt-2">
                                    <span className="text-slate-500">Formatting</span>
                                    <span className="font-semibold text-slate-900">85%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1">
                                    <div className="bg-[#135bec] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Executive Summary */}
                        <div className="mt-8 p-4 bg-[#135bec]/5 rounded-lg border border-[#135bec]/10">
                            <h3 className="text-xs font-bold text-[#135bec] uppercase tracking-widest mb-2">Executive Summary</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {analysis.summary}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Column 2: Skills & Entities */}
                <div className="lg:col-span-5">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 min-h-full">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-icons-outlined text-[#135bec]">psychology</span>
                            <h2 className="text-lg font-bold text-slate-900">Skills & Entities</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Skills from AI response */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold text-slate-700">Detected Skills & Tools</h3>
                                    <span className="text-xs text-slate-400">{skillLines.length} detected</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillLines.map((skill, i) => {
                                        const colors = [
                                            'bg-blue-100 text-blue-700 border-blue-200',
                                            'bg-indigo-100 text-indigo-700 border-indigo-200',
                                            'bg-emerald-100 text-emerald-700 border-emerald-200',
                                            'bg-amber-100 text-amber-700 border-amber-200',
                                        ];
                                        const colorClass = colors[i % colors.length];
                                        return (
                                            <span
                                                key={i}
                                                className={`px-3 py-1.5 ${colorClass} rounded-full text-xs font-medium border`}
                                            >
                                                {skill.replace(/^[-•*]\s*/, '')}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CV Preview Segment */}
                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-semibold text-slate-700 mb-4 text-center">CV Preview Segment</h3>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
                                    <p className="text-[11px] leading-relaxed text-slate-400 font-mono whitespace-pre-wrap">
                                        {analysis.skills.substring(0, 300)}{analysis.skills.length > 300 ? '...' : ''}
                                    </p>
                                    <div className="absolute bottom-1 right-2 text-[9px] uppercase tracking-widest text-slate-300">
                                        Contextual Analysis
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 3: Feedback & Suggestions */}
                <div className="lg:col-span-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-icons-outlined text-amber-500">lightbulb</span>
                            <h2 className="text-lg font-bold text-slate-900">AI Feedback & Suggestions</h2>
                        </div>

                        <div className="space-y-6">
                            {feedbackLines.map((line, i) => {
                                const iconSet = feedbackIcons[i % feedbackIcons.length];
                                const cleanLine = line.replace(/^[-•*\d.]\s*/, '');
                                return (
                                    <div key={i} className="flex gap-4">
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${iconSet.bg} flex items-center justify-center`}>
                                            <span className={`material-icons-outlined ${iconSet.text} text-sm`}>{iconSet.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 leading-relaxed">{cleanLine}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Card */}
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <div className="relative rounded-xl overflow-hidden bg-[#135bec] p-6 text-white h-48 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#135bec] via-[#135bec] to-blue-400 opacity-90"></div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <span className="bg-white/20 backdrop-blur-sm self-start px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                        Upgrade Pro
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-lg">Want a 1-on-1 expert review?</h3>
                                        <p className="text-xs text-blue-100 mt-1">
                                            Get matched with a top industry recruiter for a deep-dive session.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
