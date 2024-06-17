import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Roboto", "sans-serif"],
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1800px",
        },
        extend: {
            fontFamily: {
                counter: ["Counter Arial"],
            },
            aspectRatio: {
                "4kdci": "4096 / 2160",
                "4/3": "4 / 3",
            },
            dropShadow: {
                counter: ["0px 0px 5px rgba(0, 0, 0, 0.5)"],
            },
        },
    },
};
export default config;
