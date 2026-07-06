<script setup lang="ts">
defineProps<{
  heading: string
  lead: string
  body: string
  notes: string[]
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">{{ heading }}</p>
      <h2 class="section-title">{{ lead }}</h2>
      <p class="section-lead">{{ body }}</p>

      <div v-reveal class="mt-8 max-w-2xl rounded-md border border-harbor-600 bg-harbor-800/40 p-5">
        <p
          v-for="note in notes"
          :key="note"
          class="font-mono text-xs leading-relaxed text-paper-300"
        >
          {{ note }}
        </p>
      </div>
    </div>
  </section>
</template>
