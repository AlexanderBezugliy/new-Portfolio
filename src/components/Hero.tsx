import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import { ChevronDown } from "lucide-react";
import { useMousePosition } from "../hooks/useMousePosition";

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { x, y } = useMousePosition();
    const { scrollY } = useScroll();

    // Parallax effects
    const titleY = useTransform(scrollY, [0, 500], [0, -100]);
    const bgY = useTransform(scrollY, [0, 500], [0, 150]);

    // Mouse parallax
    const mouseX =
        (x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) / 50;
    const mouseY =
        (y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) / 50;

    const titleLines = ["I'M ALEX", "VIBE CODER"];

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
                <ParticleBackground />
            </motion.div>

            <div className="container mx-auto px-6 z-10 text-center">
                <motion.div
                    style={{
                        y: titleY,
                        rotateX: -mouseY,
                        rotateY: mouseX,
                    }}
                    className="perspective-1000"
                >
                    <motion.span
                        className="inline-block py-2 px-4 rounded-full border border-accent-blue/20 dark:border-accent-neon/30 bg-accent-blue/5 dark:bg-accent-neon/5 text-accent-blue dark:text-accent-neon text-xs font-mono mb-8 tracking-[0.2em]"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        AVAILABLE FOR NEW PROJECTS
                    </motion.span>

                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
                        {titleLines.map((line, i) => (
                            <motion.span
                                key={i}
                                className={`block ${i === 1 ? "text-gradient" : "text-foreground"}`}
                                initial={{
                                    opacity: 0,
                                    x: i % 2 === 0 ? -100 : 100,
                                }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.4 + i * 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {line}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        Building high-performance digital experiences where
                        <span className="text-foreground font-medium">
                            {" "}
                            code{" "}
                        </span>
                        meets
                        <span className="text-foreground font-medium">
                            {" "}
                            aesthetics
                        </span>
                        .
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 40px rgba(15,23,42,0.3)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30"
                        >
                            View Projects
                        </motion.button>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 8px 30px rgba(15,23,42,0.15)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 glass glass-hover text-foreground rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 border-2 border-foreground/20 hover:border-foreground/40"
                        >
                            Get in Touch
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent-neon/50 cursor-pointer"
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                onClick={() =>
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth",
                    })
                }
            >
                <ChevronDown size={32} strokeWidth={1} />
            </motion.div>

            {/* Additional Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-accent-blue/30 to-transparent" />
                <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-accent-purple/30 to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
