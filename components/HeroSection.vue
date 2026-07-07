<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  highlight: string
  subtitle: string
  badges: string[]
  ctaLabel: string
  ctaHref: string
}>()

const titleParts = computed(() => {
  const index = props.title.indexOf(props.highlight)
  if (index === -1) return { before: props.title, highlight: '', after: '' }
  return {
    before: props.title.slice(0, index),
    highlight: props.highlight,
    after: props.title.slice(index + props.highlight.length),
  }
})
</script>

<template>
  <section class="border-b border-line">
    <div class="section flex flex-col items-center py-24 text-center sm:py-32">
      <h1 class="max-w-2xl text-4xl leading-snug sm:text-5xl">
        {{ titleParts.before }}<span v-if="titleParts.highlight" class="marker-highlight">{{ titleParts.highlight }}</span>{{ titleParts.after }}
      </h1>

      <p class="mt-6 max-w-xl text-base leading-[1.9] text-body">
        {{ subtitle }}
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <span v-for="badge in badges" :key="badge" class="badge-pill">
          <span v-for="(part, i) in splitNumeric(badge)" :key="i" :class="part.numeric ? 'font-barlow font-bold' : ''">{{ part.text }}</span>
        </span>
      </div>

      <a id="hero-cta" :href="ctaHref" class="btn-cta mt-8">
        {{ ctaLabel }}
        <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>
</template>
