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
          alt: '#F5F2EA',
        },
        navy: {
          DEFAULT: '#14213D',
        },
        body: '#333333',
        gold: {
          DEFAULT: '#805A15',
        },
        cta: {
          DEFAULT: '#14213D',
          dark: '#0F1830',
        },
        line: '#E4E0D6',
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
        serif: [
          '"Noto Serif JP"',
          '"游明朝"',
          '"Yu Mincho"',
          '"Hiragino Mincho ProN"',
          'serif',
        ],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
        // 少しだけ行き過ぎてから収まる、スプリング風のイージング(Apple Design)
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      borderRadius: {
        lg: '6px',
      },
    },
  },
  plugins: [],
}
