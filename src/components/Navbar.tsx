import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

const navItems = [
    { name: "Hero", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
    const [activeSection, setActiveSection] = useState("hero");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navItems.map((item) => item.href.substring(1));
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-4 md:top-6 left-0 right-0 z-[100] px-4 flex justify-center pointer-events-none"
            >
                {/* Desktop Navigation */}
                <div
                    className={`hidden lg:flex items-center gap-4 pointer-events-auto`}
                >
                    <div
                        className={`flex nav-glass glass-hover rounded-full px-1.5 py-1.5 items-center gap-1 shadow-2xl transition-all duration-500 ${
                            isScrolled ? "max-w-max" : "max-w-4xl"
                        }`}
                    >
                        <div className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive =
                                    activeSection === item.href.substring(1);
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) =>
                                            scrollToSection(e, item.href)
                                        }
                                        className="relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors duration-300 group"
                                    >
                                        <span
                                            className={`relative z-10 transition-colors duration-300 ${isActive ? "text-[var(--pill-text)] font-bold" : "text-muted hover:text-foreground"}`}
                                        >
                                            {item.name}
                                        </span>

                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-[var(--pill-bg)] rounded-full z-0 shadow-[0_0_15px_var(--accent-glow)]"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}

                                        {!isActive && (
                                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 dark:group-hover:bg-white/5 rounded-full transition-colors duration-300" />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Mobile Header */}
                <div className="lg:hidden w-full flex justify-between items-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <ThemeToggle />
                    </div>
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="nav-glass p-3 rounded-full text-foreground shadow-2xl pointer-events-auto"
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu Modal */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] bg-background/95 lg:hidden flex flex-col items-center justify-center overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-6 md:gap-8 max-h-[80vh] overflow-y-auto no-scrollbar py-10">
                            {navItems.map((item, index) => {
                                const isActive =
                                    activeSection === item.href.substring(1);
                                return (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) =>
                                            scrollToSection(e, item.href)
                                        }
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group flex items-center justify-center px-6"
                                    >
                                        <span
                                            className={`text-3xl md:text-4xl font-black tracking-tighter transition-all duration-300 text-center ${
                                                isActive
                                                    ? "text-[var(--pill-bg)] scale-110"
                                                    : "text-muted hover:text-foreground"
                                            }`}
                                        >
                                            {item.name}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-dot"
                                                className="absolute -left-2 md:-left-8 w-2 h-2 md:w-3 md:h-3 bg-[var(--pill-bg)] rounded-full shadow-[0_0_15px_var(--accent-glow)]"
                                            />
                                        )}
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Decorative Background for Modal */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
                            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-blue/10 blur-[120px] rounded-full" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/10 blur-[120px] rounded-full" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
