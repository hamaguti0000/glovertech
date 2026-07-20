import { siteMeta } from './data/site'

const gaScripts = siteMeta.gaMeasurementId
  ? [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${siteMeta.gaMeasurementId}`,
        async: true,
      },
      {
        innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${siteMeta.gaMeasurementId}');`,
      },
    ]
  : []

export default defineNuxtConfig({
  compatibilityDate: '2024-07-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

  site: {
    url: 'https://glovertech.jp',
  },

  sitemap: {
    exclude: ['/report-sample', '/privacy', '/tokushoho'],
  },

  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false,
  },

  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/works',
        '/services',
        '/contact',
        '/articles',
        '/articles/chatgpt-how-to',
        '/articles/ai-subsidy-search',
        '/articles/subsidy-application-flow',
        '/articles/ai-subsidy-types-2026',
        '/articles/ai-for-restaurant-hospitality',
        '/articles/ai-for-construction-manufacturing',
        '/articles/ai-for-sole-proprietors',
        '/articles/ai-for-retail-salon',
        '/articles/ai-adoption-cost-guide',
        '/articles/prompt-engineering-for-business',
        '/articles/ai-api-integration-guide',
      ],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { name: 'google-site-verification', content: 'jRny-o5A2n9yxioOzXkZpwBQUl_Afe7vHxu6kwm6VeE' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // レンダリングをブロックしないよう、印刷用として読み込んでから
        // 全メディアに切り替える(フォント読み込みがLCPを遅らせないようにする)
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Noto+Serif+JP:wght@600;700&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
      noscript: [
        {
          innerHTML:
            '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Noto+Serif+JP:wght@600;700&display=swap">',
        },
      ],
      script: gaScripts,
    },
  },
})
