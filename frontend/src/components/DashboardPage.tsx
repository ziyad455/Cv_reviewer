import { motion } from 'framer-motion';
import {
    FileText,
    ArrowLeft,
    Brain,
    Lightbulb,
    Zap,
    Trophy,
    Target,
    Layout,
    CheckCircle2
} from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer
} from 'recharts';

interface AnalysisResult {
    filename: string;
    candidate_name: string;
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
    const { filename, candidate_name, analysis } = result;

    const skillLines = analysis.skills
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .map(s => s.replace(/^[-•*]\s*/, ''));

    const feedbackLines = analysis.feedback
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .map(s => s.replace(/^[-•*\d.]\s*/, ''));

    // Mock data for visualization based on analysis
    const radarData = [
        { subject: 'Technical', A: 85, fullMark: 100 },
        { subject: 'Soft Skills', A: 70, fullMark: 100 },
        { subject: 'Impact', A: 90, fullMark: 100 },
        { subject: 'ATS Rank', A: 75, fullMark: 100 },
        { subject: 'Clarity', A: 95, fullMark: 100 },
    ];

    const statsData = [
        { name: 'Impact', value: 92, color: '#135bec' },
        { name: 'Keywords', value: 78, color: '#6366f1' },
        { name: 'Formatting', value: 85, color: '#10b981' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 bg-secondary/30 min-h-screen">
            <main className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div className="space-y-4">
                        <button
                            onClick={onReset}
                            className="group flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-2"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Upload
                        </button>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                            Analysis <span className="text-gradient">Report</span>
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full shadow-sm">
                                <FileText className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold">{filename}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm font-bold uppercase tracking-wider">Candidate: {candidate_name || "Extracted"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-2xl bg-white border border-border font-bold hover:bg-secondary transition-all shadow-sm">
                            Export PDF
                        </button>
                        <button className="px-6 py-3 rounded-2xl bg-foreground text-background font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Share Results
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Left Column: Visual Metrics */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
                        {/* Overall Score Card */}
                        <div className="glass bg-white p-8 rounded-[2.5rem] shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Trophy className="w-24 h-24" />
                            </div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="h-48 w-full mb-6">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                                            <Radar
                                                name="Score"
                                                dataKey="A"
                                                stroke="#135bec"
                                                fill="#135bec"
                                                fillOpacity={0.2}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-5xl font-display font-bold text-foreground">85<span className="text-2xl text-primary">/100</span></span>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest italic">Industry Benchmark Score</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="glass bg-white p-8 rounded-[2.5rem] shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Target className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-display font-bold">Executive Summary</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-lg italic">
                                "{analysis.summary}"
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Detailed Insights */}
                    <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
                        {/* Metrics Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {statsData.map((stat, i) => (
                                <div key={i} className="glass bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{stat.name}</p>
                                    <div className="flex items-end justify-between">
                                        <span className="text-3xl font-display font-bold">{stat.value}%</span>
                                        <div className="w-16 h-1 rounded-full bg-border overflow-hidden mb-2">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Skills and Feedback Tabs Area */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Skills Section */}
                            <div className="glass bg-white p-8 rounded-[2.5rem] shadow-xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold">Top Skills</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {skillLines.map((skill, i) => (
                                        <motion.span
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-4 py-2 bg-secondary/50 border border-border rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-all cursor-default"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Feedback Section */}
                            <div className="glass bg-white p-8 rounded-[2.5rem] shadow-xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                                        <Lightbulb className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold">Next Steps</h3>
                                </div>
                                <div className="space-y-6">
                                    {feedbackLines.map((line, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
                                                <Zap className="w-3 h-3 fill-current" />
                                            </div>
                                            <p className="text-sm font-medium text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                                {line}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Call to Action Premium */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-foreground rounded-[2.5rem] p-12 text-background relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <Layout className="w-48 h-48" />
                            </div>
                            <div className="relative z-10 max-w-lg">
                                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/20">
                                    Premium Service
                                </span>
                                <h3 className="text-3xl font-display font-bold mb-4">Want a professional 1-on-1 resume audit?</h3>
                                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                                    Connect with career experts from Google, Meta, and Amazon to fine-tune your strategy.
                                </p>
                                <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                                    Book a Session
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
