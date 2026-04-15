import React from "react";
import { motion } from "framer-motion";
import { BackgroundPaths } from "./ui/background-paths";

const experience = [
    {
        company: "NEON STUDIOS",
        role: "Lead Frontend Engineer",
        period: "2022 — Present",
        description:
            "Architecting high-performance digital products using Next.js and Tailwind. Leading a team of 5 developers.",
    },
    {
        company: "VIBE LABS",
        role: "Senior UI/UX Designer",
        period: "2020 — 2022",
        description:
            "Focused on creating immersive user experiences with Framer Motion and custom GLSL shaders.",
    },
    {
        company: "CYBER CORE",
        role: "Fullstack Developer",
        period: "2018 — 2020",
        description:
            "Developed scalable backend services with Node.js and dynamic frontends with React.",
    },
    {
        company: "CODE CRAFT",
        role: "Junior Web Developer",
        period: "2016 — 2018",
        description:
            "Started my journey by building responsive landing pages and mastering modern CSS techniques.",
    },
];

const Experience: React.FC = () => {
    return (
        <section
            id="experience"
            className="py-32 bg-background relative overflow-hidden"
        >
            <BackgroundPaths color="#00f2ff" />
            {/* Background Decor */}
            <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[50%] h-[50%] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl mb-24">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-8"
                    >
                        JOURNEY <br />
                        <span className="text-gradient uppercase">
                            TIMELINE
                        </span>
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto pl-8 border-l border-white/10 space-y-24">
                    {experience.map((item, i) => (
                        <motion.div
                            key={item.company}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="relative group"
                        >
                            {/* Timeline Point */}
                            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-background border-2 border-accent-neon neon-glow-small z-20 group-hover:scale-150 transition-transform duration-300" />

                            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16">
                                <div className="w-40 flex-shrink-0">
                                    <div className="text-sm font-mono text-accent-neon/70 mb-1">
                                        {item.period}
                                    </div>
                                    <h3 className="text-xl font-black text-white group-hover:text-accent-neon transition-colors">
                                        {item.company}
                                    </h3>
                                </div>

                                <div className="flex-grow">
                                    <div className="text-lg font-bold text-gray-200 mb-4 tracking-tight">
                                        {item.role}
                                    </div>
                                    <p className="text-gray-400 font-light leading-relaxed max-w-xl">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
