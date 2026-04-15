import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const generateParticles = (isMobile: boolean) => {
    const count = isMobile ? 40 : 120;
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 15 + 8,
        delay: Math.random() * -20,
        opacity: Math.random() * 0.4 + 0.1,
    }));
};

const ParticleBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [particles, setParticles] = useState(() =>
        generateParticles(
            typeof window !== "undefined" ? window.innerWidth < 768 : false,
        ),
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 },
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        const handleResize = () => {
            setParticles(generateParticles(window.innerWidth < 768));
        };

        window.addEventListener("resize", handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    if (!isVisible)
        return <div ref={containerRef} className="absolute inset-0" />;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
            {/* Animated Gradients */}
            <motion.div
                style={{ y: y1, willChange: "transform" }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[30%] -left-[15%] w-[80%] h-[80%] rounded-full bg-accent-blue/20 dark:bg-accent-blue/30 blur-[140px]"
            />
            <motion.div
                style={{ y: y2, willChange: "transform" }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.03, 0.08, 0.03],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[20%] -right-[15%] w-[70%] h-[70%] rounded-full bg-accent-purple/15 dark:bg-accent-purple/20 blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.02, 0.06, 0.02],
                }}
                style={{ willChange: "transform, opacity" }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-10%] left-[10%] w-[60%] h-[60%] rounded-full bg-accent-neon/10 dark:bg-accent-neon/15 blur-[130px]"
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    maskImage:
                        "radial-gradient(circle at 50% 50%, black, transparent 90%)",
                }}
            />

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-foreground/20 dark:bg-white/40 rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        willChange: "transform, opacity",
                    }}
                    animate={{
                        y: [0, -150, 0],
                        opacity: [p.opacity, p.opacity * 2, p.opacity],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
