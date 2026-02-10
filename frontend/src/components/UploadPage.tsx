import { useState, useRef, DragEvent } from 'react';

interface UploadPageProps {
    onAnalyze: (file: File) => void;
    isAnalyzing: boolean;
    error: string | null;
}

export default function UploadPage({ onAnalyze, isAnalyzing, error }: UploadPageProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFile: File) => {
        const name = selectedFile.name.toLowerCase();
        if (name.endsWith('.pdf') || name.endsWith('.docx')) {
            setFile(selectedFile);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleAnalyze = () => {
        if (file) onAnalyze(file);
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <>
            <main className="max-w-7xl mx-auto px-6 pt-16 pb-24">
                {/* Hero Section */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#135bec]/10 text-[#135bec] text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="material-icons text-xs">bolt</span>
                        AI-Powered Feedback
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                        Perfect Your Resume with <span className="text-[#135bec]">AI Analysis</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Upload your CV in seconds and receive instant feedback on keywords, formatting, and overall impact to land your dream job.
                    </p>
                </div>

                {/* Upload Interface */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-xl border border-[#135bec]/10 shadow-xl overflow-hidden">
                        <div className="p-8">
                            {/* Drop Zone */}
                            <div
                                className={`group relative border-2 border-dashed rounded-xl transition-all duration-300 p-12 text-center drop-zone-pattern cursor-pointer ${isDragging
                                        ? 'border-[#135bec] bg-[#135bec]/15'
                                        : 'border-[#135bec]/30 bg-[#135bec]/5 hover:bg-[#135bec]/10'
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
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-icons text-[#135bec] text-3xl">cloud_upload</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        Drag and drop your file here
                                    </h3>
                                    <p className="text-slate-500 mb-6">
                                        or <span className="text-[#135bec] font-medium">browse files</span> from your computer
                                    </p>
                                    {/* Supported Formats */}
                                    <div className="flex items-center gap-4 justify-center">
                                        <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded border border-[#135bec]/10 shadow-sm">
                                            <span className="material-icons text-red-500 text-sm">picture_as_pdf</span>
                                            <span className="text-xs font-semibold uppercase">PDF</span>
                                        </div>
                                        <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded border border-[#135bec]/10 shadow-sm">
                                            <span className="material-icons text-blue-500 text-sm">description</span>
                                            <span className="text-xs font-semibold uppercase">DOCX</span>
                                        </div>
                                        <span className="text-xs text-slate-400">Max 5MB</span>
                                    </div>
                                </div>
                            </div>

                            {/* Selected File Preview */}
                            {file && (
                                <div className="mt-8">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-[#135bec]/10">
                                        <div className="flex items-center gap-3">
                                            <span className="material-icons text-[#135bec]">insert_drive_file</span>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                                <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                            onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                                        >
                                            <span className="material-icons text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Error message */}
                            {error && (
                                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm">
                                    <span className="material-icons text-red-500">error</span>
                                    {error}
                                </div>
                            )}

                            {/* Action Button */}
                            <div className="mt-8">
                                <button
                                    className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-[#135bec]/25 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={handleAnalyze}
                                    disabled={!file || isAnalyzing}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analyzing your CV...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-icons">auto_awesome</span>
                                            Analyze My CV
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Trust / Privacy */}
                    <div className="mt-8 text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                            <span className="material-icons text-green-500 text-base">lock</span>
                            Your data is encrypted and deleted after 24 hours. 10,000+ candidates trust us.
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-[#135bec]/10">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#135bec]/10 flex items-center justify-center text-[#135bec]">
                            <span className="material-icons">search</span>
                        </div>
                        <h3 className="text-xl font-bold">Keyword Matching</h3>
                        <p className="text-slate-600">
                            Our AI scans for industry-specific keywords that Applicant Tracking Systems (ATS) look for.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#135bec]/10 flex items-center justify-center text-[#135bec]">
                            <span className="material-icons">trending_up</span>
                        </div>
                        <h3 className="text-xl font-bold">Impact Analysis</h3>
                        <p className="text-slate-600">
                            Get suggestions on how to quantify your achievements to stand out to recruiters.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#135bec]/10 flex items-center justify-center text-[#135bec]">
                            <span className="material-icons">style</span>
                        </div>
                        <h3 className="text-xl font-bold">Formatting Check</h3>
                        <p className="text-slate-600">
                            Identify formatting errors that might prevent your CV from being read correctly by software.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
