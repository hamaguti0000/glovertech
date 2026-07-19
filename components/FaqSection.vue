<script setup lang="ts">
import type { FaqItem } from '~/data/site'

defineProps<{
  items: FaqItem[]
  label: string
}>()
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title">よくあるご質問</h2>

      <div class="mt-10 divide-y divide-line border-y border-line">
        <details v-for="item in items" :key="item.question" class="group py-5">
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 text-navy transition-[color,transform] duration-300 hover:text-gold active:scale-[0.98] active:duration-100"
          >
            <span class="text-lg">{{ item.question }}</span>
            <span class="faq-icon shrink-0 text-2xl text-gold" aria-hidden="true">+</span>
          </summary>
          <p class="faq-answer mt-4 max-w-2xl text-base leading-[1.9] text-body">
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

.faq-icon {
  display: inline-block;
  transition: transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.group[open] .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  animation: faq-answer-in 450ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes faq-answer-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-icon {
    transition: none;
  }
  .faq-answer {
    animation: none;
  }
}
</style>
