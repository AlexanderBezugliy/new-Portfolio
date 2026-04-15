import React from "react";

const CssBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[var(--background)]">
            {/* Mesh Gradient with CSS only */}
            <div 
                className="absolute inset-0 opacity-[0.4] dark:opacity-[0.3]"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, var(--accent-blue) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, var(--accent-purple) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, var(--accent-neon) 0%, transparent 50%)
                    `,
                    filter: "blur(120px)",
                    animation: "mesh-animation 20s ease-in-out infinite alternate",
                    willChange: "transform",
                }}
            />
            
            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
                style={{
                    backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    maskImage: "radial-gradient(circle at 50% 50%, black, transparent 90%)",
                }}
            />

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes mesh-animation {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(2%, 4%) scale(1.1); }
                    66% { transform: translate(-2%, 2%) scale(0.9); }
                    100% { transform: translate(1%, -3%) scale(1.05); }
                }
            `}} />
        </div>
    );
};

export default CssBackground;
