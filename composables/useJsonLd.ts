import { siteMeta, type FaqItem } from '~/data/site'

export function useProfessionalServiceJsonLd() {
  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    areaServed: siteMeta.areaServed,
    logo: `${siteMeta.url}/images/logo-mark.svg`,
    image: `${siteMeta.url}/images/logo-mark.svg`,
  }

  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(professionalService) }],
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
