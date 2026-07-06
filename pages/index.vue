<script setup lang="ts">
import { hero } from '~/data/site'
</script>

<template>
  <main>
    <HeroSection
      :title="hero.title"
      :subtitle="hero.subtitle"
      :cta-label="hero.ctaLabel"
      :cta-href="hero.ctaHref"
    />
  </main>
</template>
