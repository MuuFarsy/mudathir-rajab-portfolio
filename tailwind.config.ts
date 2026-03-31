import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgb(var(--border) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.16)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(99,102,241,0.24)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top, rgba(99, 102, 241, 0.16), transparent 32%), linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        'hero-grid': 'auto, 32px 32px, 32px 32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
