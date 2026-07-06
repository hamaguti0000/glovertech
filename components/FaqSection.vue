<script setup lang="ts">
import type { FaqItem } from '~/data/site'

defineProps<{
  items: FaqItem[]
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">よくあるご質問</p>
      <h2 class="section-title">よくあるご質問</h2>

      <div class="mt-10 divide-y divide-harbor-600 border-y border-harbor-600">
        <details
          v-for="item in items"
          :key="item.question"
          v-reveal
          class="group py-5"
        >
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-paper-100">
            <span class="text-lg">{{ item.question }}</span>
            <span
              class="shrink-0 font-mono text-xl text-lantern-500 transition-transform duration-300 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p class="mt-4 max-w-2xl leading-relaxed text-paper-300">
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
