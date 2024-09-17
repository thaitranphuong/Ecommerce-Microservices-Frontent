import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            screens: {
                md: { min: '740px', max: '1023px' },
                sm: { max: '739px' },
            },
            keyframes: {
                showheader: {
                    from: { top: '-85px' },
                },
                changeColor: {
                    '0%': { color: 'red' },
                    '25%': { color: 'blue' },
                    '50%': { color: 'green' },
                    '75%': { color: 'orange' },
                    '100%': { color: 'purple' },
                },
            },
            animation: {
                showheader: 'showheader 0.4s linear',
                'color-change1': 'changeColor 2.8s infinite',
                'color-change2': 'changeColor 3.1s infinite',
                'color-change3': 'changeColor 2.5s infinite',
            },
        },
    },
    plugins: [],
};
export default config;
