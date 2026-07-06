<script setup lang="ts">
import { hero, problems, services, subsidy, plans, flowSteps, profile, faqItems, contact } from '~/data/site'
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
