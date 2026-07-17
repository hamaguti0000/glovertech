<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  highlight: string
  subtitle: string
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

// 折り返しが文節の途中で起きないよう、意味の区切りで分割する
// (この分割はhero.titleの内容に依存するため、想定外のテキストが
// 来た場合はhighlightSegmentsが1要素のフォールバックになる)
const highlightSegments = computed(() => {
  const [seg1, seg2] = ['その手作業を', 'AIで']
  const seg3 = titleParts.value.highlight.slice(seg1.length + seg2.length)
  if (seg1 + seg2 + seg3 !== titleParts.value.highlight) return [titleParts.value.highlight]
  return [seg1, seg2, seg3]
})
</script>

<template>
  <section class="border-b border-line">
    <div class="section flex flex-col items-center py-24 text-center sm:py-32">
      <h1 class="w-full max-w-2xl text-4xl leading-snug sm:text-5xl [word-break:keep-all] [overflow-wrap:break-word]">
        {{ titleParts.before }}<wbr /><span
          v-if="titleParts.highlight"
          class="marker-highlight"
        ><template
          v-for="(seg, i) in highlightSegments"
          :key="i"
        >{{ seg }}<wbr v-if="i < highlightSegments.length - 1" /></template></span>{{ titleParts.after }}
      </h1>

      <p class="mt-6 max-w-xl text-base leading-[1.9] text-body">
        {{ subtitle }}
      </p>

      <NuxtLink id="hero-cta" :to="ctaHref" class="btn-cta mt-8">
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
      </NuxtLink>
    </div>
  </section>
</template>
