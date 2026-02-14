import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FileText } from 'lucide-react';

export default function Header() {
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (logoRef.current && textRef.current) {
            const tl = gsap.timeline({ paused: true });
            tl.to(logoRef.current, {
                scale: 1.1,
                rotate: 5,
                duration: 0.3,
                ease: "power2.out"
            })
                .to(textRef.current, {
                    x: 5,
                    color: "#135bec",
                    duration: 0.3,
                    ease: "power2.out"
                }, 0);

            const handleMouseEnter = () => tl.play();
            const handleMouseLeave = () => tl.reverse();

            const container = logoRef.current.parentElement;
            container?.addEventListener('mouseenter', handleMouseEnter);
            container?.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                container?.removeEventListener('mouseenter', handleMouseEnter);
                container?.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return (
        <header className="fixed top-0 z-[100] w-full glass border-b border-border/50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="group flex items-center gap-3 cursor-pointer">
                    <div
                        ref={logoRef}
                        className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-shadow duration-300 group-hover:shadow-primary/40"
                    >
                        <FileText className="text-white w-6 h-6" />
                    </div>
                    <span
                        ref={textRef}
                        className="text-2xl font-display font-bold tracking-tight text-foreground transition-colors duration-300"
                    >
                        CV<span className="text-primary group-hover:text-accent">Reviewer</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-semibold hover:bg-foreground/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-black/5">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}

