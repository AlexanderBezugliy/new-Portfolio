import React, { useEffect, useRef, useMemo } from "react";
import { cn } from "../../lib/utils";
import { useTheme } from "next-themes";

interface NeuralBackgroundProps {
    className?: string;
    /**
     * Color of the particles.
     * Defaults to a cyan/indigo mix if not specified.
     */
    color?: string;
    /**
     * The opacity of the trails (0.0 to 1.0).
     * Lower = longer trails. Higher = shorter trails.
     * Default: 0.1
     */
    trailOpacity?: number;
    /**
     * Number of particles. Default: 800
     */
    particleCount?: number;
    /**
     * Speed multiplier. Default: 1
     */
    speed?: number;
}

export default function NeuralBackground({
    className,
    color,
    trailOpacity = 0.15,
    particleCount = 600,
    speed = 1,
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    // Determine active color based on theme if not provided as prop
    const activeColor = useMemo(() => {
        if (color) return color;
        // Matching project's accent colors
        return theme === "dark" ? "#00f2ff" : "#3b82f6";
    }, [color, theme]);

    // Determine background color for trails based on theme
    const bgColor = useMemo(() => {
        // Matching index.css variables: #020617 for dark, #fdfdfd for light
        return theme === "dark" ? "2, 6, 23" : "253, 253, 253";
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // --- CONFIGURATION ---
        let width = container.clientWidth;
        let height = container.clientHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;
        const mouse = { x: -1000, y: -1000 }; // Start off-screen
        let isVisible = true;

        // Intersection Observer to pause animation when not visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.1 },
        );
        observer.observe(container);

        // --- PARTICLE CLASS ---
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            age: number;
            life: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.age = 0;
                // Random lifespan to create natural recycling
                this.life = Math.random() * 200 + 100;
            }

            update() {
                // 1. Flow Field Math (Simplex-ish noise)
                // We calculate an angle based on position to create the "flow"
                const angle =
                    (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) *
                    Math.PI;

                // 2. Add force from flow field
                this.vx += Math.cos(angle) * 0.2 * speed;
                this.vy += Math.sin(angle) * 0.2 * speed;

                // 3. Mouse Repulsion/Attraction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = 150;

                if (distance < interactionRadius) {
                    const force =
                        (interactionRadius - distance) / interactionRadius;
                    // Push away
                    this.vx -= dx * force * 0.05;
                    this.vy -= dy * force * 0.05;
                }

                // 4. Apply Velocity & Friction
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.95; // Friction to stop infinite acceleration
                this.vy *= 0.95;

                // 5. Aging
                this.age++;
                if (this.age > this.life) {
                    this.reset();
                }

                // 6. Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = 0;
                this.vy = 0;
                this.age = 0;
                this.life = Math.random() * 200 + 100;
            }

            draw(context: CanvasRenderingContext2D) {
                context.fillStyle = activeColor;
                // Fade in and out based on age
                const alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;
                context.globalAlpha = alpha;
                context.fillRect(this.x, this.y, 1.5, 1.5); // Tiny dots are faster than arcs
            }
        }

        // --- INITIALIZATION ---
        const init = () => {
            // Handle High-DPI screens (Retina)
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            particles = [];
            // Reduce particle count on mobile for performance
            const effectiveParticleCount =
                window.innerWidth < 768
                    ? Math.floor(particleCount / 3)
                    : particleCount;
            for (let i = 0; i < effectiveParticleCount; i++) {
                particles.push(new Particle());
            }
        };

        // --- ANIMATION LOOP ---
        const animate = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            // "Fade" effect: Instead of clearing the canvas, we draw a semi-transparent rect
            // This creates the "Trails" look.
            ctx.fillStyle = `rgba(${bgColor}, ${trailOpacity})`;
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // --- EVENT LISTENERS ---
        const handleResize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        // Start
        init();
        animate();

        window.addEventListener("resize", handleResize);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [activeColor, bgColor, trailOpacity, particleCount, speed]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full h-full overflow-hidden transition-colors duration-500",
                "bg-background",
                className,
            )}
            style={{ willChange: "transform, opacity" }}
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
