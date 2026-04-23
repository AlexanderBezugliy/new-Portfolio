import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

const projects = [
    {
        title: "CYBERSPACE V1",
        description:
            "A fully immersive 3D landing page built with React Three Fiber and GSAP.",
        tags: ["React", "R3F", "GSAP", "GLSL"],
        color: "#3b82f6",
    },
    {
        title: "NEON DASH",
        description:
            "High-performance dashboard with real-time analytics and predictive models.",
        tags: ["Next.js", "TRPC", "Prisma", "PostgreSQL"],
        color: "#a855f7",
    },
    {
        title: "VIBE STREAM",
        description:
            "Decentralized audio streaming platform with real-time collaboration features.",
        tags: ["Web3", "Solidity", "Tailwind", "PeerJS"],
        color: "#00f2ff",
    },
    {
        title: "QUANTUM UI",
        description:
            "A design system focused on micro-interactions and glassmorphism components.",
        tags: ["Storybook", "Framer Motion", "Radix UI"],
        color: "#ec4899",
    },
];

const ProjectCard: React.FC<{
    project: (typeof projects)[0];
    index: number;
}> = React.memo(({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: "some" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="group relative flex flex-col glass glass-hover rounded-[40px] overflow-hidden transition-all duration-500 border-border/20 dark:border-white/5"
        >
            {/* Image Placeholder */}
            <div className="relative h-64 overflow-hidden bg-surface-medium/20 dark:bg-surface-medium">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundColor: `${project.color}15` }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <span className="text-4xl font-bold tracking-tighter opacity-10 uppercase text-foreground">
                        {project.title.split(" ")[0]}
                    </span>
                </div>

                {/* Project Header Overlay */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                        <button className="p-3 glass rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-foreground">
                            <Github size={18} />
                        </button>
                        <button className="p-3 glass rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-foreground">
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 glass text-[10px] font-mono tracking-wider rounded-full uppercase text-muted group-hover:text-accent-blue dark:group-hover:text-accent-neon transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-gradient transition-colors">
                    {project.title}
                </h3>
                <p className="text-muted text-sm font-light leading-relaxed mb-6 flex-grow">
                    {project.description}
                </p>

                <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-foreground font-medium text-sm group-hover:text-accent-blue dark:group-hover:text-accent-neon transition-colors"
                >
                    View Case Study
                    <ChevronRight size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
});

const Projects: React.FC = React.memo(() => {
    return (
        <section id="projects" className="py-32 relative bg-background">
            {/* Background Decor */}
            <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        >
                            FEATURED <br />
                            <span className="text-gradient">WORKS</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="hidden md:block"
                    >
                        <button className="px-10 py-4 glass glass-hover rounded-full text-sm font-bold tracking-widest uppercase border-2 border-foreground/20 hover:border-foreground/40 transition-all duration-500 hover:shadow-xl hover:shadow-black/10">
                            Browse All Projects
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:hidden mt-12"
                >
                    <button className="w-full py-4 glass glass-hover rounded-full text-sm font-bold tracking-widest uppercase border-2 border-foreground/20">
                        Browse All Projects
                    </button>
                </motion.div>
            </div>
        </section>
    );
});

export default Projects;
