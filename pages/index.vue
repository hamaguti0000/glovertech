<script setup lang="ts">
import {
  hero,
  aboutIntro,
  services,
  servicesFootnote,
  flowSteps,
  worksPage,
  topContact,
  siteMeta,
  sectionLabels,
} from '~/data/site'

useHead({
  title: siteMeta.title,
  meta: [{ name: 'description', content: siteMeta.description }],
  link: [{ rel: 'canonical', href: siteMeta.url }],
})

useSocialMeta({
  title: siteMeta.title,
  description: siteMeta.description,
  url: siteMeta.url,
  type: 'website',
})

useProfessionalServiceJsonLd()

const worksTeaserItems = worksPage.items.slice(0, 3)
</script>

<template>
  <main>
    <HeroSection
      :title="hero.title"
      :highlight="hero.highlight"
      :subtitle="hero.subtitle"
      :cta-label="hero.ctaLabel"
      :cta-href="hero.ctaHref"
    />
    <AboutIntroSection
      :label="sectionLabels.about"
      :body="aboutIntro.body"
      :link-label="aboutIntro.linkLabel"
      :link-href="aboutIntro.linkHref"
    />
    <ServicesSection :services="services" :label="sectionLabels.services" :footnote="servicesFootnote" />
    <FlowSection :steps="flowSteps" :label="sectionLabels.flow" />
    <WorksTeaser :items="worksTeaserItems" :label="sectionLabels.works" :lead="worksPage.homeLead" />
    <ColumnSection alt />
    <TopContactSection
      :heading="topContact.heading"
      :lead="topContact.lead"
      :cta-label="topContact.ctaLabel"
      :cta-href="topContact.ctaHref"
      :label="sectionLabels.contact"
    />
  </main>
</template>
