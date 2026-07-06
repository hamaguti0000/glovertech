<script setup lang="ts">
import { hero, problems, services, subsidy, plans, flowSteps, profile, faqItems, contact, siteMeta } from '~/data/site'

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
      :subtitle="hero.subtitle"
      :cta-label="hero.ctaLabel"
      :cta-href="hero.ctaHref"
    />
    <ProblemsSection :problems="problems" />
    <ServicesSection :services="services" />
    <SubsidySection
      :heading="subsidy.heading"
      :lead="subsidy.lead"
      :body="subsidy.body"
      :notes="subsidy.notes"
    />
    <PricingSection :plans="plans" />
    <FlowSection :steps="flowSteps" />
    <ProfileSection
      :name="profile.name"
      :role="profile.role"
      :description="profile.description"
      :meeting-hours="profile.meetingHours"
    />
    <FaqSection :items="faqItems" />
    <ContactSection
      :heading="contact.heading"
      :description="contact.description"
      :formspree-endpoint="contact.formspreeEndpoint"
    />
  </main>
</template>
