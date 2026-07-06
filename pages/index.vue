<script setup lang="ts">
import { hero, problems, services, subsidy, plans } from '~/data/site'
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
  </main>
</template>
