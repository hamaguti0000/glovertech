<script setup lang="ts">
defineProps<{
  name: string
  description: string
  label: string
}>()
</script>

<template>
  <section class="border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>

      <div class="mt-8 grid gap-10 sm:grid-cols-[auto,1fr]">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full border border-line text-lg text-navy"
          aria-hidden="true"
        >
          長崎
        </div>

        <div>
          <h2 v-reveal class="text-3xl">{{ name }}</h2>
          <p class="mt-3 max-w-2xl text-base leading-[1.9] text-body">{{ description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
