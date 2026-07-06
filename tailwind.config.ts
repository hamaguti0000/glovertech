import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0e17',
          800: '#0f1420',
          700: '#141a2a',
          600: '#1b2335',
          500: '#2a3450',
        },
        mist: {
          400: '#5b6478',
          300: '#8b93a7',
          200: '#b8bfcf',
          100: '#e5e9f0',
        },
        cyan: {
          400: '#22d3ee',
          300: '#67e8f9',
        },
        violet: {
          400: '#a78bfa',
          300: '#c4b5fd',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Inter"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, rgba(5,7,13,0.9)), linear-gradient(rgba(139,147,167,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,147,167,0.08) 1px, transparent 1px)',
        'accent-gradient': 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
        'radial-glow':
          'radial-gradient(600px circle at var(--x, 50%) var(--y, 0%), rgba(34,211,238,0.15), transparent 70%)',
      },
      backgroundSize: {
        grid: '100% 100%, 40px 40px, 40px 40px',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(34,211,238,0.45)',
        'glow-violet': '0 0 40px -8px rgba(167,139,250,0.45)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
