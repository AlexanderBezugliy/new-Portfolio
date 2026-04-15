import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParticleBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const particles = useMemo(() => {
        const generateParticles = () => {
            return Array.from({ length: 120 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2.5 + 0.5,
                duration: Math.random() * 15 + 8,
                delay: Math.random() * -20,
                opacity: Math.random() * 0.4 + 0.1,
            }));
        };
        return generateParticles();
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
            {/* Animated Gradients */}
            <motion.div
                style={{ y: y1 }}
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[30%] -left-[15%] w-[80%] h-[80%] rounded-full bg-accent-blue/20 blur-[140px]"
            />
            <motion.div
                style={{ y: y2 }}
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] -right-[15%] w-[70%] h-[70%] rounded-full bg-accent-purple/15 blur-[120px]"
            />
            <motion.div 
                animate={{ 
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.05, 0.15, 0.05]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] left-[10%] w-[60%] h-[60%] rounded-full bg-accent-neon/10 blur-[130px]" 
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.25]"
                style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    maskImage:
                        "radial-gradient(circle at 50% 50%, black, transparent 90%)",
                }}
            />

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white/40 rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
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
