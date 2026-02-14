import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Search, Layout, Sparkles, BarChart3 } from 'lucide-react';

const messages = [
    "Analyzing your skills...",
    "Evaluating experience relevance...",
    "Checking structure and clarity...",
    "Optimizing for ATS compatibility...",
    "Generating personalized feedback...",
    "Identifying key achievements...",
    "Benchmarking against industry standards...",
    "Polishing final insights..."
];

export default function LoadingAnalysis() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Message rotation
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);

        // Simulated progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 96) return prev;
                // Much slower progression to simulate deep analysis
                // Take roughly 15-20s to reach ~90%
                const increment = Math.max(0.05, (100 - prev) / 300) + (Math.random() * 0.05);
                return Math.min(96, prev + increment);
            });
        }, 120);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    const icons = [Brain, Search, Layout, Sparkles, BarChart3];
    const Icon = icons[messageIndex % icons.length];

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass rounded-[2.5rem] p-12 text-center shadow-2xl relative"
            >
                {/* Pulse effect wrapper */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 animate-ping opacity-20 pointer-events-none" />

                {/* Animated Icon Container */}
                <div className="relative mb-10 inline-block">
                    <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center relative z-10 overflow-hidden">
                        <motion.div
                            key={messageIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        >
                            <Icon className="w-12 h-12 text-primary" />
                        </motion.div>

                        {/* Shimmer effect inside icon */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>

                    {/* Outer rotating ring */}
                    <div className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                </div>

                <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    Unlocking Your Potential
                </h2>

                <div className="h-8 mb-10 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={messageIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="text-lg text-muted-foreground font-medium italic"
                        >
                            {messages[messageIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress Section */}
                <div className="space-y-4">
                    <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                        {/* Shimmer on progress bar */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>

                    <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
                            <Zap className="w-3 h-3 text-primary" /> System Processing
                        </span>
                        <span className="tabular-nums">{Math.floor(progress)}%</span>
                    </div>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-muted-foreground text-sm flex items-center gap-2"
            >
                <Sparkles className="w-4 h-4 text-primary" /> This usually takes less than 15 seconds
            </motion.p>
        </div>
    );
}
