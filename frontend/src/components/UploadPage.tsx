import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import {
    CloudUpload,
    FileText,
    CheckCircle2,
    AlertCircle,
    X,
    Zap,
    ShieldCheck,
    Search,
    TrendingUp,
    Layout
} from 'lucide-react';

interface UploadPageProps {
    onAnalyze: (file: File) => void;
    isAnalyzing: boolean;
    error: string | null;
}

export default function UploadPage({ onAnalyze, isAnalyzing, error }: UploadPageProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(heroRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
            );
        }

        if (shapesRef.current) {
            gsap.to(shapesRef.current.children, {
                y: "random(-20, 20)",
                x: "random(-20, 20)",
                rotation: "random(-15, 15)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.1
            });
        }
    }, []);

    const handleFileSelect = (selectedFile: File) => {
        const name = selectedFile.name.toLowerCase();
        if (name.endsWith('.pdf') || name.endsWith('.docx')) {
            setFile(selectedFile);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="relative pt-32 pb-24 overflow-hidden">
            {/* Background Decorative Elements */}
            <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute top-32 right-1/4 w-12 h-12 border-2 border-primary/10 rounded-xl" />
                <div className="absolute bottom-48 left-1/4 w-8 h-8 bg-accent/10 rounded-full" />
            </div>

            <main className="max-w-7xl mx-auto px-6">
                {/* Hero Section */}
                <div ref={heroRef} className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-8"
                    >
                        <Zap className="w-4 h-4" />
                        Next-Gen AI Analysis
                    </motion.div>
                    <h1 className="text-6xl md:text-7xl font-display font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
                        Optimize Your Career <br />
                        <span className="text-gradient">With Precision AI</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Bridge the gap between your resume and your dream job. Instant, actionable insights that beat Applicant Tracking Systems.
                    </p>
                </div>

                {/* Upload Interface */}
                <div className="max-w-2xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="glass rounded-3xl p-2 md:p-3 shadow-2xl relative z-10"
                    >
                        <div className="bg-white rounded-[2rem] p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                {!file ? (
                                    <motion.div
                                        key="dropzone"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`group relative border-2 border-dashed rounded-[1.5rem] transition-all duration-500 p-12 text-center drop-zone-pattern cursor-pointer ${isDragging
                                            ? 'border-primary bg-primary/5 scale-[0.98]'
                                            : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                                            }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            className="hidden"
                                            type="file"
                                            accept=".pdf,.docx"
                                            onChange={handleInputChange}
                                        />
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 ease-out">
                                                <CloudUpload className="w-10 h-10 transition-transform duration-500" />
                                            </div>
                                            <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                                                Ready to elevate your CV?
                                            </h3>
                                            <p className="text-muted-foreground text-lg mb-8">
                                                Drag your file here or <span className="text-primary font-semibold underline underline-offset-4">browse</span>
                                            </p>

                                            <div className="flex items-center gap-6 justify-center">
                                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground bg-secondary px-4 py-2 rounded-xl">
                                                    <FileText className="w-4 h-4 text-red-500" /> PDF
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground bg-secondary px-4 py-2 rounded-xl">
                                                    <FileText className="w-4 h-4 text-primary" /> DOCX
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="file-ready"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="py-12 text-center"
                                    >
                                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold mb-2">{file.name}</h3>
                                        <p className="text-muted-foreground mb-10">{formatSize(file.size)}</p>

                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                onClick={handleRemoveFile}
                                                className="px-6 py-4 rounded-2xl bg-secondary text-foreground font-bold hover:bg-border transition-colors flex items-center gap-2"
                                            >
                                                <X className="w-5 h-5" /> Change
                                            </button>
                                            <button
                                                onClick={() => onAnalyze(file)}
                                                disabled={isAnalyzing}
                                                className="flex-1 px-8 py-4 rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                <Zap className="w-5 h-5 fill-current" /> Analyze Now
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-600 font-medium"
                                >
                                    <AlertCircle className="w-6 h-6 shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Privacy Badge */}
                    <div className="text-center mt-12">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-secondary/50 text-muted-foreground text-sm font-medium">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            Secure, encrypted analysis. Files are deleted automatically.
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-32 mt-12 border-t border-border/50">
                <div className="grid md:grid-cols-3 gap-16">
                    {[
                        {
                            icon: Search,
                            title: "ATS Optimization",
                            desc: "Reverse-engineered ATS algorithms to ensure your CV passes through the digital gatekeepers."
                        },
                        {
                            icon: TrendingUp,
                            title: "Impact Metrics",
                            desc: "Transform passive descriptions into powerful achievement-based metrics that grab attention."
                        },
                        {
                            icon: Layout,
                            title: "Visual Hierarchy",
                            desc: "Expert feedback on your resume structure to ensure recruiters see what matters most first."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group space-y-6"
                        >
                            <div className="w-16 h-16 rounded-[1.25rem] bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 ease-out shadow-sm">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-display font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
