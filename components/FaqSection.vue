<script setup lang="ts">
import type { FaqItem } from '~/data/site'

defineProps<{
  items: FaqItem[]
}>()
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <h2 v-reveal class="section-title">よくあるご質問</h2>

      <div class="mt-10 divide-y divide-line border-y border-line">
        <details v-for="item in items" :key="item.question" class="group py-5">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-heading">
            <span class="text-lg">{{ item.question }}</span>
            <span class="shrink-0 text-xl text-body group-open:hidden" aria-hidden="true">+</span>
            <span class="hidden shrink-0 text-xl text-body group-open:inline" aria-hidden="true">−</span>
          </summary>
          <p class="mt-4 max-w-2xl text-base leading-[1.9] text-body">
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
summary::-webkit-details-marker {
  display: none;
}
</style>
