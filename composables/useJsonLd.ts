import { siteMeta, type FaqItem } from '~/data/site'

export function useJsonLd(faqItems: FaqItem[]) {
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
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(professionalService) },
      { type: 'application/ld+json', innerHTML: JSON.stringify(faqPage) },
    ],
  })
}
