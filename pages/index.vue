<script setup lang="ts">
import { hero, problems, services } from '~/data/site'
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
  </main>
</template>
