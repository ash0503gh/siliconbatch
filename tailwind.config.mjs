/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#FCFBF7',
        cream: '#F4EFE6',
        ink: '#000000',
        brutal: {
          yellow: '#FFE600',
          blue: '#2563EB',
          coral: '#FF5E7E',
          pink: '#FB7185',
          mint: '#10B981',
          orange: '#FF6B35',
          purple: '#8B5CF6',
        },
        foundry: {
          bg: '#F4EFE6',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          cardHover: '#FCFBF7',
          border: '#000000',
          borderHover: '#000000',
          text: '#000000',
          textSoft: '#475569',
          muted: '#64748B',
          indigo: '#2563EB',
          cyan: '#0284C7',
          mint: '#10B981',
          rose: '#FF5E7E',
          amber: '#FFE600',
          orange: '#FF6B35',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #000000',
        'brutal': '3px 3px 0px #000000',
        'brutal-lg': '4px 4px 0px #000000',
        'brutal-xl': '6px 6px 0px #000000',
        'brutal-2xl': '8px 8px 0px #000000',
        glow: '3px 3px 0px #000000',
        'glow-cyan': '3px 3px 0px #000000',
        'glow-rose': '3px 3px 0px #000000',
      }
    },
  },
  plugins: [],
};
