<script setup lang="ts">
import { header, footer } from '~/data/site'
</script>

<template>
  <div>
    <SiteHeader
      :name="header.name"
      :tagline="header.tagline"
      :cta-label="header.ctaLabel"
      :cta-href="header.ctaHref"
    />
    <slot />
    <SiteFooter
      :name="footer.name"
      :description="footer.description"
      :address="footer.address"
      :links="footer.links"
      :related-site="footer.relatedSite"
    />
  </div>
</template>
