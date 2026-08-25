import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1b1b1b',
        cream: '#f7f5f0',
        accent: '#d8a39d',
        sage: '#bfc9b7'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Arial', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
