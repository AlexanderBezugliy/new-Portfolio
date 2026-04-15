import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Smartphone, Globe, Cpu } from "lucide-react";
import ShaderBackground from "./ui/shader-background";

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
];

const SkillCard: React.FC<{ skill: (typeof skills)[0]; index: number }> = ({
    skill,
    index,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass glass-hover p-6 rounded-3xl relative group overflow-hidden"
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: skill.color }}
            />

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                    <skill.icon className="w-6 h-6 text-accent-neon group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent-neon transition-colors">
                    {skill.name}
                </h3>
                <p className="text-gray-400 text-sm font-mono tracking-wider">
                    {skill.level}
                </p>
            </div>

            <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <skill.icon className="w-12 h-12" />
            </div>
        </motion.div>
    );
};

const Skills: React.FC = () => {
    return (
        <section
            id="skills"
            className="py-24 bg-background relative overflow-hidden"
        >
            <ShaderBackground />
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
                        className="text-gray-400 text-lg font-light leading-relaxed"
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
};

export default Skills;
