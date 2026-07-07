<script setup lang="ts">
defineProps<{
  name: string
  role: string
  description: string
  meetingHours: string
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
          <h2 class="text-3xl">{{ name }}</h2>
          <p class="mt-1 text-sm text-body">{{ role }}</p>
          <p class="mt-5 max-w-2xl text-base leading-[1.9] text-body">{{ description }}</p>
          <p class="mt-5 inline-block rounded-lg border border-line px-4 py-2 text-sm text-body">
            {{ meetingHours }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
