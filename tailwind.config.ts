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
        // 稲佐山から望む長崎港の夜景を基調としたパレット
        harbor: {
          950: '#080a0f',
          900: '#0b0e15',
          800: '#12151e',
          700: '#1a1e2a',
          600: '#252b3a',
        },
        paper: {
          100: '#eef0f4',
          300: '#9aa1b2',
          500: '#666d80',
        },
        lantern: {
          300: '#f0c878',
          500: '#d9a441',
          700: '#a8791f',
        },
      },
      fontFamily: {
        display: ['"Shippori Mincho"', '"Noto Serif JP"', 'serif'],
        sans: ['"Zen Kaku Gothic New"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
      },
    },
  },
  plugins: [],
}
