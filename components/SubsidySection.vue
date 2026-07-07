<script setup lang="ts">
defineProps<{
  lead: string
  body: string
  notes: string[]
  examplesHeading: string
  examples: string[]
  label: string
}>()
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title">{{ lead }}</h2>
      <p class="section-lead">{{ body }}</p>

      <div class="mt-8 max-w-2xl rounded-lg border border-line bg-white p-5">
        <p v-for="note in notes" :key="note" class="text-sm leading-[1.9] text-body">
          {{ note }}
        </p>
      </div>

      <div class="mt-6 max-w-2xl rounded-lg border border-line bg-white p-5">
        <p class="text-sm font-bold">{{ examplesHeading }}</p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-body">
          <li v-for="(example, index) in examples" :key="index">{{ example }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
