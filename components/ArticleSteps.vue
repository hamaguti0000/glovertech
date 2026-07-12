<script setup lang="ts">
import type { ArticleStep } from '~/data/articles'

defineProps<{
  steps: ArticleStep[]
}>()
</script>

<template>
  <ol class="mt-6 space-y-6">
    <li v-for="(step, index) in steps" :key="step.title" class="flex gap-4">
      <span
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
        aria-hidden="true"
      >
        {{ index + 1 }}
      </span>
      <div class="pt-0.5">
        <h3 class="text-lg text-navy">{{ step.title }}</h3>
        <p class="mt-1 max-w-2xl text-sm leading-[1.9] text-body">{{ step.description }}</p>
      </div>
    </li>
  </ol>
</template>
