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

<style scoped>
.hero-copy {
  animation: hero-fade-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-visual {
  animation: hero-fade-in 700ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both;
  background: linear-gradient(155deg, #1d2c52 0%, #14213d 55%, #0f1830 100%);
}

.hero-visual-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 28% 22%, rgba(192, 138, 46, 0.32), transparent 55%);
}

.hero-visual-frame {
  position: absolute;
  left: 12%;
  right: 12%;
  top: 14%;
  bottom: 14%;
  border: 1px solid rgba(192, 138, 46, 0.35);
}

.hero-visual-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes hero-fade-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy,
  .hero-visual {
    animation: none;
  }
}
</style>

<template>
  <section class="overflow-hidden border-b border-line">
    <div class="section grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
      <div class="hero-copy">
        <h1 class="max-w-2xl font-serif text-4xl leading-snug sm:text-5xl [word-break:keep-all] [overflow-wrap:break-word]">
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

        <NuxtLink id="hero-cta" v-magnetic :to="ctaHref" class="btn-cta mt-8">
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

      <div class="hero-visual relative aspect-[4/3] overflow-hidden rounded-md lg:aspect-[5/4]">
        <div class="hero-visual-glow" aria-hidden="true" />
        <div class="hero-visual-frame" aria-hidden="true" />
        <LogoPulse class="hero-visual-logo" :size="128" />
      </div>
    </div>
  </section>
</template>
