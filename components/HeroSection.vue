<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}>()
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-radial-glow"
      aria-hidden="true"
    />

    <div class="section relative flex min-h-[80vh] flex-col justify-center py-28 sm:py-36">
      <span
        class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-mist-300"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow" />
        長崎のAI導入・業務効率化支援
      </span>

      <h1 class="mt-8 max-w-3xl text-4xl font-extrabold leading-tight text-mist-100 sm:text-5xl md:text-6xl">
        {{ title }}
      </h1>

      <p class="section-lead">
        {{ subtitle }}
      </p>

      <div class="mt-10 flex flex-wrap items-center gap-4">
        <a :href="ctaHref" class="btn-glow">
          {{ ctaLabel }}
        </a>
      </div>
    </div>
  </section>
</template>
