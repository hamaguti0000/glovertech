import { siteMeta, type FaqItem } from '~/data/site'

export function useProfessionalServiceJsonLd() {
  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    areaServed: [
      { '@type': 'City', name: '長崎市' },
      { '@type': 'City', name: '佐世保市' },
      { '@type': 'City', name: '諫早市' },
      { '@type': 'City', name: '大村市' },
      { '@type': 'AdministrativeArea', name: siteMeta.areaServed },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: '長崎市',
      addressRegion: '長崎県',
      addressCountry: 'JP',
    },
    logo: `${siteMeta.url}/images/logo-mark.svg`,
    image: `${siteMeta.url}/images/logo-mark.svg`,
  }

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(professionalService) }],
  })
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function useBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbList) }],
  })
}

export function useFaqPageJsonLd(faqItems: FaqItem[]) {
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(faqPage) }],
  })
}
