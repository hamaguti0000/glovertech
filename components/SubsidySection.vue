<script setup lang="ts">
defineProps<{
  heading: string
  lead: string
  body: string
  notes: string[]
}>()
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <p class="text-sm font-bold text-heading">{{ heading }}</p>
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
