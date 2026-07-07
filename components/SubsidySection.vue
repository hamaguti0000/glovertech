<script setup lang="ts">
defineProps<{
  heading: string
  lead: string
  body: string
  notes: string[]
  label: string
}>()
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>
      <p class="mt-3 text-sm font-bold text-navy">{{ heading }}</p>
      <h2 v-reveal class="section-title">{{ lead }}</h2>
      <p class="section-lead">{{ body }}</p>

      <div class="mt-8 max-w-2xl rounded-lg border border-line bg-white p-5">
        <p v-for="note in notes" :key="note" class="text-sm leading-[1.9] text-body">
          {{ note }}
        </p>
      </div>
    </div>
  </section>
</template>
