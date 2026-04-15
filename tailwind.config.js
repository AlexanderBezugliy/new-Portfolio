/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#020617",
                accent: {
                    blue: "#3b82f6",
                    purple: "#a855f7",
                    neon: "#00f2ff",
                },
                surface: {
                    light: "rgba(255, 255, 255, 0.05)",
                    medium: "rgba(255, 255, 255, 0.1)",
                },
            },
            fontFamily: {
                sans: ["Geist Sans", "Inter", "sans-serif"],
                mono: ["Roboto Mono", "monospace"],
            },
            animation: {
                "gradient-x": "gradient-x 15s ease infinite",
                "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                "gradient-x": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
            },
        },
    },
    plugins: [],
};
