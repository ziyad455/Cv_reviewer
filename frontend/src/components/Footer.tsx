import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-border/50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <FileText className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight text-foreground">
                                CV<span className="text-primary">Reviewer</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                            Empowering candidates with AI-driven insights to navigate the modern job market with confidence.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-foreground">Product</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            {['Features', 'AI Analysis', 'Pro Review', 'Pricing'].map(item => (
                                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-foreground">Company</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            {['About Us', 'Documentation', 'Privacy Policy', 'Support'].map(item => (
                                <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-muted-foreground">
                    <p>© {new Date().getFullYear()} CV Reviewer AI. Engineered for excellence.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary transition-colors">Security</a>
                        <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

