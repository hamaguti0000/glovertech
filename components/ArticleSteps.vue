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
        class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-alt"
        aria-hidden="true"
      >
        <ArticleIcon v-if="step.icon" :name="step.icon" />
        <span v-else class="text-sm font-bold text-navy">{{ index + 1 }}</span>
        <span
          v-if="step.icon"
          class="absolute -bottom-1.5 -right-1.5 flex items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white"
          style="height: 1.125rem; width: 1.125rem"
        >
          {{ index + 1 }}
        </span>
      </span>
      <div class="pt-1">
        <h3 class="text-lg text-navy">{{ step.title }}</h3>
        <p class="mt-1 max-w-2xl text-sm leading-[1.9] text-body">{{ step.description }}</p>
      </div>
    </li>
  </ol>
</template>
