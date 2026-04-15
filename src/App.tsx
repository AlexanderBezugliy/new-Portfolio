import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const App: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const [isAtContact, setIsAtContact] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                // If the top of contact section is within 200px of the top, or if we've scrolled near the bottom
                const reached = rect.top <= 200 || (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50);
                setIsAtContact(reached);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Map scroll progress to reach 100% when the user reaches the Contact section.
    const transformedProgress = useTransform(
        scrollYProgress,
        [0, 0.88],
        [0, 1],
    );

    const scaleX = useSpring(transformedProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="relative selection:bg-accent-neon/30">
            <CustomCursor />
            <Navbar />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-neon z-[110] origin-left shadow-[0_0_10px_rgba(0,242,255,0.2)]"
                style={isAtContact ? { transform: "none" } : { scaleX }}
            />

            <main className="bg-background text-foreground transition-colors duration-500">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
                <Footer />
            </main>

            {/* Global Background Glow */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-blue/5 dark:bg-accent-blue/10 blur-[120px] rounded-full transition-colors duration-500" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/5 dark:bg-accent-purple/10 blur-[120px] rounded-full transition-colors duration-500" />
            </div>
        </div>
    );
};

export default App;
