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
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F8FC',
        },
        navy: {
          DEFAULT: '#223A70',
        },
        body: '#333333',
        yellow: {
          DEFAULT: '#FFD338',
        },
        cta: {
          DEFAULT: '#FF7A1A',
          dark: '#E86A0F',
        },
        line: '#E2E8EB',
      },
      fontFamily: {
        sans: [
          '"ヒラギノ角ゴ ProN"',
          '"Hiragino Kaku Gothic ProN"',
          '"游ゴシック体"',
          'YuGothic',
          '"游ゴシック Medium"',
          '"Yu Gothic Medium"',
          'メイリオ',
          'Meiryo',
          'sans-serif',
        ],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      borderRadius: {
        lg: '0.5rem',
      },
    },
  },
  plugins: [],
}
