<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  title: string
  highlight: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}>()

const frameRectEl = ref<SVGRectElement | null>(null)

onMounted(async () => {
  if (typeof window === 'undefined' || !frameRectEl.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const length = frameRectEl.value.getTotalLength()
  const { gsap } = await import('gsap')
  gsap.set(frameRectEl.value, { strokeDasharray: length, strokeDashoffset: length })
  gsap.to(frameRectEl.value, {
    strokeDashoffset: 0,
    duration: 1.3,
    delay: 0.35,
    ease: 'power2.inOut',
  })
})

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
.hero-anim {
  opacity: 0;
  animation: hero-fade-in 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-anim-1 {
  animation-delay: 0ms;
}

.hero-anim-2 {
  animation-delay: 140ms;
}

.hero-anim-3 {
  animation-delay: 280ms;
}

.hero-anim-4 {
  animation-delay: 200ms;
}

.hero-visual {
  background: linear-gradient(155deg, #1d2c52 0%, #14213d 55%, #0f1830 100%);
}

.hero-visual-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(circle at 28% 22%, rgba(192, 138, 46, 0.32), transparent 55%);
  animation: hero-glow-in 900ms cubic-bezier(0.22, 1, 0.36, 1) 150ms forwards;
}

.hero-visual-frame-svg {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
}

.hero-visual-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  animation: hero-logo-in 700ms cubic-bezier(0.22, 1, 0.36, 1) 400ms forwards;
}

@keyframes hero-logo-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.85);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
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

@keyframes hero-glow-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-anim {
    animation: none;
    opacity: 1;
  }

  .hero-visual-glow {
    animation: none;
    opacity: 1;
  }

  .hero-visual-frame-rect {
    animation: none;
    stroke-dashoffset: 0;
  }

  .hero-visual-logo {
    animation: none;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>

<template>
  <section class="relative overflow-hidden border-b border-line">
    <div class="section relative grid items-center gap-10 py-16 sm:py-20 lg:py-28">
      <div class="hero-copy relative z-10 lg:max-w-xl">
        <h1
          class="hero-anim hero-anim-1 max-w-2xl font-serif text-4xl leading-snug sm:text-5xl [word-break:keep-all] [overflow-wrap:break-word]"
        >
          {{ titleParts.before }}<wbr /><span
            v-if="titleParts.highlight"
            class="marker-highlight"
          ><template
            v-for="(seg, i) in highlightSegments"
            :key="i"
          >{{ seg }}<wbr v-if="i < highlightSegments.length - 1" /></template></span>{{ titleParts.after }}
        </h1>

        <p class="hero-anim hero-anim-2 mt-6 max-w-xl text-base leading-[1.9] text-body">
          {{ subtitle }}
        </p>

        <NuxtLink id="hero-cta" :to="ctaHref" class="hero-anim hero-anim-3 btn-cta mt-8">
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

      <div
        class="hero-anim hero-anim-4 hero-visual relative aspect-[4/3] overflow-hidden rounded-md lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[44vw] lg:rounded-none"
      >
        <div class="hero-visual-glow" aria-hidden="true" />
        <svg class="hero-visual-frame-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect
            ref="frameRectEl"
            class="hero-visual-frame-rect"
            x="12"
            y="14"
            width="76"
            height="72"
            fill="none"
            stroke="rgba(192, 138, 46, 0.45)"
            stroke-width="0.4"
          />
        </svg>
        <LogoPulse class="hero-visual-logo" :size="128" />
      </div>
    </div>
  </section>
</template>
