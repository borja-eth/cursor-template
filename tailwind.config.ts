import {Config} from 'tailwindcss'
import {tailwindConfig} from "@roxom-markets/spark-ui";

module.exports = {
    presets: [tailwindConfig],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    theme: {
        
        fontFamily: {
            sans: ['var(--font-main)', 'sans-serif'],
        },
        extend: {
            animation: {
                marquee: 'marquee 10s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(50%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        }
    },
} satisfies Config;