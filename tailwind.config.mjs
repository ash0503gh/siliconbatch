/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        foundry: {
          bg: '#05070B',
          surface: '#0B0F17',
          card: '#0D111A',
          cardHover: '#131926',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(99, 102, 241, 0.35)',
          text: '#FFFFFF',
          textSoft: '#94A3B8',
          muted: '#64748B',
          indigo: '#6366F1',
          cyan: '#38BDF8',
          mint: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
          purple: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Geist Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(99, 102, 241, 0.15)',
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.15)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.2)',
      }
    },
  },
  plugins: [],
};
