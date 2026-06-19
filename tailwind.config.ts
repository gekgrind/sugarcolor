import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08090b',
        charcoal: '#101116',
        smoke: '#181a21',
        ash: '#23262f',
        slate: '#3a3e49',
        bone: '#f5ece1',
        cream: '#ece1d2',
        muted: '#9a8f80',
        copper: {
          DEFAULT: '#b87333',
          50: '#fbf1e6',
          100: '#f1d9b6',
          200: '#e6bf85',
          300: '#d99465',
          400: '#c8823f',
          500: '#b87333',
          600: '#9a5e26',
          700: '#7a4a1f',
          800: '#5a3617',
          900: '#3a230f',
        },
        ember: '#e9a86a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        italic: ['var(--font-italic)', 'serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        wider2: '0.18em',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        'fade-up': 'fadeUp 1s ease-out forwards',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
