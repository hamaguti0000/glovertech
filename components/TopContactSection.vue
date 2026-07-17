<script setup lang="ts">
defineProps<{
  heading: string
  lead: string
  ctaLabel: string
  ctaHref: string
  label: string
}>()
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section max-w-2xl text-center">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title text-center">{{ heading }}</h2>
      <p class="section-lead mx-auto text-center">{{ lead }}</p>

      <NuxtLink :to="ctaHref" class="btn-cta mt-8 inline-flex">
        {{ ctaLabel }}
        <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>
