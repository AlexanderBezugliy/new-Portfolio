import React from "react";
import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Layout,
    Smartphone,
    Globe,
    Cpu,
    Zap,
    Box,
    Layers,
    Share2,
    Cloud,
    Terminal,
    Figma,
} from "lucide-react";
import CssBackground from "./CssBackground";

const skills = [
    { name: "React", icon: Layout, level: "Expert", color: "#61DAFB" },
    { name: "Next.js", icon: Globe, level: "Expert", color: "#ffffff" },
    { name: "TypeScript", icon: Code2, level: "Advanced", color: "#3178C6" },
    {
        name: "Tailwind CSS",
        icon: Smartphone,
        level: "Expert",
        color: "#06B6D4",
    },
    { name: "Node.js", icon: Database, level: "Advanced", color: "#339933" },
    { name: "Framer Motion", icon: Cpu, level: "Advanced", color: "#FF0055" },
    // Row 2
    { name: "Vue.js", icon: Layout, level: "Intermediate", color: "#42B883" },
    { name: "Svelte", icon: Zap, level: "Intermediate", color: "#FF3E00" },
    { name: "Three.js", icon: Box, level: "Advanced", color: "#ffffff" },
    { name: "Figma", icon: Figma, level: "Expert", color: "#F24E1E" },
    { name: "Redux", icon: Layers, level: "Advanced", color: "#764ABC" },
    { name: "GraphQL", icon: Share2, level: "Advanced", color: "#E10098" },
    // Row 3
    { name: "Docker", icon: Box, level: "Advanced", color: "#2496ED" },
    { name: "PostgreSQL", icon: Database, level: "Advanced", color: "#336791" },
    { name: "AWS", icon: Cloud, level: "Intermediate", color: "#FF9900" },
    { name: "Python", icon: Code2, level: "Advanced", color: "#3776AB" },
    { name: "Go", icon: Zap, level: "Intermediate", color: "#00ADD8" },
    { name: "Rust", icon: Terminal, level: "Beginner", color: "#DEA584" },
];

const SkillCard: React.FC<{ skill: (typeof skills)[0]; index: number }> =
    React.memo(({ skill, index }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px", amount: "some" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ willChange: "transform, opacity" }}
                className="glass glass-hover p-6 rounded-3xl relative group overflow-hidden"
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: skill.color }}
                />

                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50/50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-100/50 dark:group-hover:bg-white/10 transition-colors">
                        <skill.icon className="w-6 h-6 text-primary dark:text-accent-neon group-hover:scale-110 transition-transform" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                    </h3>
                    <p className="text-muted text-sm font-mono tracking-wider">
                        {skill.level}
                    </p>
                </div>

                <div className="absolute bottom-4 right-4 opacity-[0.03] dark:opacity-10 group-hover:opacity-[0.08] dark:group-hover:opacity-20 transition-opacity">
                    <skill.icon className="w-12 h-12 text-primary dark:text-white" />
                </div>
            </motion.div>
        );
    });

const Skills: React.FC = React.memo(() => {
    return (
        <section
            id="skills"
            className="py-24 bg-background relative overflow-hidden"
        >
            <CssBackground />
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        THE TECH <span className="text-gradient">STACK</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted text-lg font-light leading-relaxed"
                    >
                        My approach combines modern architecture with a focus on
                        visual impact. I use technologies that allow for fast
                        iteration without compromising performance.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={skill.name}
                            skill={skill}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Skills;
