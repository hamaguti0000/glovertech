<script setup lang="ts">
import {
  hero,
  problems,
  services,
  servicesFootnote,
  subsidy,
  plans,
  pricingNote,
  flowSteps,
  profile,
  faqItems,
  contact,
  siteMeta,
  stickyCta,
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
    <ServicesSection :services="services" :label="sectionLabels.services" :footnote="servicesFootnote" />
    <div class="border-b border-line">
      <div class="section">
        <SupportScopeChart />
      </div>
    </div>
    <SubsidySection
      :lead="subsidy.lead"
      :body="subsidy.body"
      :notes="subsidy.notes"
      :label="sectionLabels.subsidy"
    />
    <PricingSection :plans="plans" :label="sectionLabels.pricing" :note="pricingNote" />
    <FlowSection :steps="flowSteps" :label="sectionLabels.flow" />
    <ProfileSection
      :name="profile.name"
      :description="profile.description"
      :label="sectionLabels.profile"
    />
    <FaqSection :items="faqItems" :label="sectionLabels.faq" />
    <ColumnSection />
    <ContactSection
      :heading="contact.heading"
      :description="contact.description"
      :formspree-endpoint="contact.formspreeEndpoint"
      :label="sectionLabels.contact"
    />
  </main>
  <StickyCta :label="stickyCta.label" :href="stickyCta.href" />
</template>
