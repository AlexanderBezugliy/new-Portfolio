import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ChevronUp } from "lucide-react";

const Footer: React.FC = () => {
    const socialLinks = [
        { name: "GitHub", icon: Github, href: "#" },
        { name: "LinkedIn", icon: Linkedin, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "Email", icon: Mail, href: "mailto:hello@example.com" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="py-20 relative bg-background border-t border-border/10">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-accent-blue/10 dark:via-accent-neon/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight text-foreground">
                            LET'S <span className="text-gradient">TALK</span>
                        </h2>
                        <p className="text-muted text-lg font-light leading-relaxed max-w-md">
                            Always looking for new challenges and opportunities
                            to build something extraordinary.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-14 h-14 flex items-center justify-center glass rounded-2xl hover:bg-foreground dark:hover:bg-white hover:text-background dark:hover:text-background hover:neon-glow dark:hover:neon-glow transition-all duration-300 group text-foreground"
                            >
                                <social.icon
                                    size={22}
                                    className="transition-transform group-hover:scale-110"
                                />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="mt-24 pt-12 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-muted font-mono tracking-wider">
                    <p>© 2026 ALEX VIBE CODER. ALL RIGHTS RESERVED.</p>

                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="hover:text-foreground transition-colors uppercase"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="hover:text-foreground transition-colors uppercase"
                        >
                            Terms
                        </a>
                    </div>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -5 }}
                        className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-foreground dark:hover:bg-white hover:text-background dark:hover:text-background transition-all duration-300 text-foreground"
                    >
                        <ChevronUp size={20} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
