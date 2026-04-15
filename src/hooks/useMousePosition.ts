import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

export const useMousePosition = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) return;

        let rafId: number;
        const handleMouseMove = (event: MouseEvent) => {
            rafId = requestAnimationFrame(() => {
                x.set(event.clientX);
                y.set(event.clientY);
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [x, y]);

    return { x, y };
};
