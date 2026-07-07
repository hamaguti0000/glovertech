<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}>()
</script>

<template>
  <section class="border-b border-line">
    <div class="section flex flex-col items-center py-24 text-center sm:py-32">
      <h1 class="max-w-2xl text-3xl leading-snug text-heading sm:text-4xl">
        {{ title }}
      </h1>

      <p class="mt-6 max-w-xl text-base leading-[1.9] text-body">
        {{ subtitle }}
      </p>

      <a :href="ctaHref" class="btn-primary mt-8">
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
      </a>
    </div>
  </section>
</template>
