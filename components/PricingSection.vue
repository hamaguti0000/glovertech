<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Plan } from '~/data/site'

const props = defineProps<{
  plans: Plan[]
}>()

const gridEl = ref<HTMLElement | null>(null)
const displayedPrices = ref<string[]>(props.plans.map((plan) => plan.price))
let observer: IntersectionObserver | null = null

function animateCountUp() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  props.plans.forEach((plan, index) => {
    const match = plan.price.match(/^(\d+)(.*)$/)
    if (!match) return

    const target = Number(match[1])
    const suffix = match[2]
    if (target === 0) return

    const duration = 900
    const start = performance.now()

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      displayedPrices.value[index] = `${Math.round(target * eased)}${suffix}`
      if (t < 1) requestAnimationFrame(step)
      else displayedPrices.value[index] = plan.price
    }
    requestAnimationFrame(step)
  })
}

onMounted(() => {
  if (!gridEl.value) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animateCountUp()
          observer?.disconnect()
        }
      }
    },
    { threshold: 0.3 },
  )
  observer.observe(gridEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">料金</p>
      <h2 class="section-title">料金表</h2>
      <p class="section-lead">まずは無料相談から。ご納得いただいた範囲でのみ、次のステップに進みます。</p>

      <div ref="gridEl" class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(plan, index) in plans"
          :key="plan.name"
          v-reveal
          class="panel flex flex-col"
          :class="index === 0 ? 'border-lantern-700' : ''"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <h3 class="text-lg text-paper-100">{{ plan.name }}</h3>
          <p class="mt-4 font-mono text-2xl tabular-nums text-lantern-500">{{ displayedPrices[index] }}</p>
          <p class="mt-4 flex-1 text-sm leading-relaxed text-paper-300">{{ plan.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
