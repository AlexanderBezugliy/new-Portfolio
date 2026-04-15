import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";

const socials = [
    { name: "GitHub", icon: Github, link: "https://github.com/alex" },
    { name: "Twitter", icon: Twitter, link: "https://twitter.com/alex" },
    { name: "LinkedIn", icon: Linkedin, link: "https://linkedin.com/in/alex" },
    { name: "Email", icon: Mail, link: "mailto:alex@example.com" },
];

const SocialLink: React.FC<{ social: (typeof socials)[0]; i: number }> = React.memo(({ social, i }) => (
    <motion.a
        key={social.name}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        style={{ willChange: "transform, opacity" }}
        className="group p-6 glass hover:neon-glow dark:hover:neon-glow light-hover transition-all duration-300 rounded-3xl flex flex-col items-center gap-4 border border-border/10 dark:border-white/5"
    >
        <div className="w-12 h-12 rounded-2xl bg-foreground/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-accent-blue dark:group-hover:bg-accent-neon group-hover:text-white dark:group-hover:text-background transition-colors duration-500">
            <social.icon size={24} />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-muted group-hover:text-foreground dark:group-hover:text-white transition-colors flex items-center gap-1">
            {social.name}
            <ArrowUpRight size={12} />
        </div>
    </motion.a>
));

const Contact: React.FC = () => {
    return (
        <section
            id="contact"
            className="py-32 bg-background relative overflow-hidden"
        >
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            
            <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50">
                <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                />
            </div>

            {/* Background Decor */}
            <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{ willChange: "transform, opacity" }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none text-foreground">
                        LET'S CREATE <br />
                        <span className="text-gradient">THE FUTURE.</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-muted font-light mb-16 leading-relaxed max-w-2xl mx-auto">
                        Have an exciting project or just want to say hi? I'm
                        always open to new opportunities and collaborations.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-24">
                        <motion.a
                            href="mailto:alex@example.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ willChange: "transform" }}
                            className="text-4xl md:text-5xl font-bold text-foreground hover:text-accent-blue dark:hover:text-accent-neon transition-colors duration-300 underline underline-offset-8 decoration-accent-blue/30 dark:decoration-accent-neon/30"
                        >
                            alex@example.com
                        </motion.a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        {socials.map((social, i) => (
                            <SocialLink
                                key={social.name}
                                social={social}
                                i={i}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Background Decor - Bottom Right */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default Contact;
