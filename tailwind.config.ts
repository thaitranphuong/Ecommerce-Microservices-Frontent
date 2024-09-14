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
            },
            animation: {
                showheader: 'showheader 0.4s linear',
            },
        },
    },
    plugins: [],
};
export default config;
