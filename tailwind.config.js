/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Change this line
  theme: {
    extend: {
      colors: {
        primary: '#0A192F',
        accent: '#64FFDA',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      animation: {
        'terminal-cursor': 'blink 1s step-end infinite',
        'network-flow': 'flow 20s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        flow: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
};