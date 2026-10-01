/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#06090f',
          surface: '#0c1018',
          card: '#131a28',
          cardHover: '#182238',
          border: '#1b2540',
          borderActive: '#2a3a5c',
          text: '#e6ecf4',
          textSoft: '#b4c0d4',
          muted: '#556580',
          accent: '#3b82f6',
          accentDim: '#2563eb',
          green: '#22c55e',
          greenDim: '#16a34a',
          red: '#ef4444',
          redDim: '#dc2626',
          orange: '#f59e0b',
          purple: '#a78bfa',
          cyan: '#06b6d4',
          gold: '#fbbf24',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Fragment Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
