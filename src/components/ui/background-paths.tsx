"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

function FloatingPaths({
    position,
    color,
}: {
    position: number;
    color?: string;
}) {
    const paths = useMemo(
        () =>
            Array.from({ length: 36 }, (_, i) => ({
                id: i,
                d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
                    380 - i * 5 * position
                } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
                    152 - i * 5 * position
                } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
                    684 - i * 5 * position
                } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
                width: 0.5 + i * 0.03,
                duration: 20 + ((i * 7) % 10),
            })),
        [position],
    );

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={color || "currentColor"}
                        strokeWidth={path.width}
                        strokeOpacity={0.15 + path.id * 0.025}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({ color }: { color?: string }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0">
                <FloatingPaths position={1} color={color} />
                <FloatingPaths position={-1} color={color} />
            </div>
        </div>
    );
}
