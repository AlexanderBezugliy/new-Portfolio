import React, { useState, useEffect, memo } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ScrollProgressBar: React.FC = memo(() => {
    const { scrollYProgress } = useScroll();
    const [isAtContact, setIsAtContact] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                const reached = rect.top <= 200 || (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50);
                setIsAtContact(reached);
            }
        };

        // Throttle scroll event for performance
        let tick = false;
        const throttledScroll = () => {
            if (!tick) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    tick = false;
                });
                tick = true;
            }
        };

        window.addEventListener("scroll", throttledScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", throttledScroll);
    }, []);

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
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-neon z-[110] origin-left shadow-[0_0_10px_rgba(0,242,255,0.2)]"
            style={isAtContact ? { transform: "none" } : { scaleX }}
        />
    );
});

export default ScrollProgressBar;
