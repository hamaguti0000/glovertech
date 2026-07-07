<script setup lang="ts">
import {
  hero,
  problems,
  services,
  subsidy,
  plans,
  flowSteps,
  profile,
  faqItems,
  contact,
  siteMeta,
  stickyCta,
  sectionLabels,
} from '~/data/site'

const ogImageUrl = `${siteMeta.url}${siteMeta.ogImage}`

useHead({
  title: siteMeta.title,
  meta: [
    { name: 'description', content: siteMeta.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteMeta.title },
    { property: 'og:title', content: siteMeta.title },
    { property: 'og:description', content: siteMeta.description },
    { property: 'og:url', content: siteMeta.url },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:locale', content: 'ja_JP' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: siteMeta.title },
    { name: 'twitter:description', content: siteMeta.description },
    { name: 'twitter:image', content: ogImageUrl },
  ],
  link: [{ rel: 'canonical', href: siteMeta.url }],
})

useJsonLd(faqItems)
</script>

<template>
  <main>
    <HeroSection
      :title="hero.title"
      :highlight="hero.highlight"
      :subtitle="hero.subtitle"
      :badges="hero.badges"
      :cta-label="hero.ctaLabel"
      :cta-href="hero.ctaHref"
    />
    <ProblemsSection :problems="problems" :label="sectionLabels.problems" />
    <ServicesSection :services="services" :label="sectionLabels.services" />
    <SubsidySection
      :lead="subsidy.lead"
      :body="subsidy.body"
      :notes="subsidy.notes"
      :examples-heading="subsidy.examplesHeading"
      :examples="subsidy.examples"
      :label="sectionLabels.subsidy"
    />
    <PricingSection :plans="plans" :label="sectionLabels.pricing" />
    <FlowSection :steps="flowSteps" :label="sectionLabels.flow" />
    <ProfileSection
      :name="profile.name"
      :role="profile.role"
      :description="profile.description"
      :meeting-hours="profile.meetingHours"
      :label="sectionLabels.profile"
    />
    <FaqSection :items="faqItems" :label="sectionLabels.faq" />
    <ContactSection
      :heading="contact.heading"
      :description="contact.description"
      :formspree-endpoint="contact.formspreeEndpoint"
      :label="sectionLabels.contact"
    />
  </main>
  <StickyCta :label="stickyCta.label" :href="stickyCta.href" />
</template>
