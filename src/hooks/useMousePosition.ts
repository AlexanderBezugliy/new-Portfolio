import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

export const useMousePosition = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [x, y]);

    return { x, y };
};
