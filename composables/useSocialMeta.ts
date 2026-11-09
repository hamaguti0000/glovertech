import { siteMeta } from '~/data/site'

interface SocialMetaOptions {
  title: string
  description: string
  url: string
  type?: 'website' | 'article'
}

export function useSocialMeta({ title, description, url, type = 'website' }: SocialMetaOptions) {
  const ogImageUrl = `${siteMeta.url}${siteMeta.ogImage}`

  useHead({
    meta: [
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteMeta.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImageUrl },
      { property: 'og:locale', content: 'ja_JP' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImageUrl },
    ],
  })
}
