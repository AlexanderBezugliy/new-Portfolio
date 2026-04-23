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
import { CoreSpinLoader } from "./components/ui/core-spin-loader";
import ScrollProgressBar from "./components/ui/scroll-progress-bar";

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
                <CoreSpinLoader />
            </div>
        );
    }

    return (
        <div className="relative selection:bg-accent-neon/30">
            <CustomCursor />
            <Navbar />

            <ScrollProgressBar />

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
