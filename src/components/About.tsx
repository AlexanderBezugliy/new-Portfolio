import React from "react";
import { motion } from "framer-motion";

const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "40+" },
    { label: "Happy Clients", value: "25+" },
    { label: "Lines of Code", value: "1M+" },
];

const About: React.FC = () => {
    return (
        <section
            id="about"
            className="py-32 relative bg-background overflow-hidden"
        >
            {/* Decorative text background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none opacity-[0.02] flex items-center justify-center overflow-hidden">
                <span className="text-[40vw] font-black leading-none tracking-tighter">
                    PHILOSOPHY
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Content side */}
                    <div className="lg:col-span-7 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                                CRAFTING{" "}
                                <span className="text-gradient italic">
                                    INTENTION
                                </span>{" "}
                                <br />
                                THROUGH CODE.
                            </h2>
                            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                                I believe that every pixel should serve a
                                purpose. My work sits at the intersection of{" "}
                                <span className="text-white font-medium">
                                    technical precision
                                </span>{" "}
                                and
                                <span className="text-white font-medium">
                                    {" "}
                                    creative expression
                                </span>
                                . I don't just build websites; I create digital
                                environments that resonate.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: i * 0.1 + 0.5,
                                        duration: 0.5,
                                    }}
                                >
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-mono text-accent-neon uppercase tracking-widest">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual side - Asymmetric Image/Box */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative aspect-square rounded-[60px] glass overflow-hidden p-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 via-transparent to-accent-purple/20" />
                            <div className="w-full h-full rounded-[50px] bg-surface-medium flex items-center justify-center border border-white/10 group">
                                <div className="text-accent-neon/20 group-hover:text-accent-neon/40 transition-colors duration-500">
                                    {/* Placeholder for an image or dynamic element */}
                                    <svg
                                        width="200"
                                        height="200"
                                        viewBox="0 0 200 200"
                                        fill="currentColor"
                                    >
                                        <path d="M100 0L122.451 70.4363H195.106L136.327 113.127L158.779 183.564L100 140.873L41.2215 183.564L63.6733 113.127L4.89435 70.4363H77.5486L100 0Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute -top-0 -right-0 w-32 h-32 glass rounded-full flex items-center justify-center p-4 text-center text-[10px] font-bold leading-tight tracking-widest uppercase border border-white/20"
                            >
                                Focus on <br /> Performance
                            </motion.div>
                        </motion.div>

                        {/* Background Glow */}
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
