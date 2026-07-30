/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ['Fraunces', 'serif'],
                ui: ['Fraunces', 'serif'],
                sans: ['Fraunces', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                purple: '#3B1E5E',
                indigo: '#4B2E83',
                midnight: '#000000',
                gold: '#FBBF24',
                saffron: '#F4A340',
                ivory: '#FDFBF7',
                cream: '#F7EFE1',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 25s linear infinite',
                'spin-slower': 'spin 60s linear infinite',
            },
        },
    },
    plugins: [],
};