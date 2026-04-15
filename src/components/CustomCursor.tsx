import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const CustomCursor: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) return;

        let rafId: number;
        const handleMouseMove = (event: MouseEvent) => {
            rafId = requestAnimationFrame(() => {
                mouseX.set(event.clientX);
                mouseY.set(event.clientY);
            });
        };

        const handleMouseOver = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [mouseX, mouseY]);

    const springX = useSpring(
        useTransform(mouseX, (x) => x - 16),
        {
            damping: 25,
            stiffness: 250,
        },
    );
    const springY = useSpring(
        useTransform(mouseY, (y) => y - 16),
        {
            damping: 25,
            stiffness: 250,
        },
    );

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
            style={{
                x: springX,
                y: springY,
                willChange: "transform",
            }}
        >
            <motion.div
                animate={{
                    scale: isHovered ? 2 : 1,
                    backgroundColor: isHovered
                        ? "var(--accent-glow)"
                        : "transparent",
                    borderColor: isHovered ? "var(--pill-bg)" : "var(--muted)",
                }}
                className="w-full h-full rounded-full border transition-colors duration-300 flex items-center justify-center"
            >
                <div className="w-1 h-1 bg-foreground rounded-full" />
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
