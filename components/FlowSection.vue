<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { FlowStep } from '~/data/site'

defineProps<{
  steps: FlowStep[]
}>()

const wrapperEl = ref<HTMLElement | null>(null)
const progress = ref(0)
const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let ticking = false

function updateProgress() {
  if (wrapperEl.value) {
    const rect = wrapperEl.value.getBoundingClientRect()
    const start = window.innerHeight * 0.85
    const value = (start - rect.top) / rect.height
    progress.value = Math.min(Math.max(value, 0), 1)
  }
  ticking = false
}

function handleScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateProgress)
}

onMounted(() => {
  if (reduceMotion) return
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">進め方</p>
      <h2 class="section-title">3つのステップで進めます</h2>
      <p class="section-lead">
        無料相談とレポートまでは費用がかかりません。ご納得いただけない場合は、そこで終了して構いません。
      </p>

      <div ref="wrapperEl" class="relative mt-14 pl-8">
        <div class="absolute left-0 top-0 h-full w-px bg-harbor-600" aria-hidden="true" />
        <div
          v-if="!reduceMotion"
          class="absolute left-0 top-0 w-px bg-lantern-500"
          :style="{ height: `${progress * 100}%` }"
          aria-hidden="true"
        />

        <ol class="space-y-10">
          <li
            v-for="(step, index) in steps"
            :key="step.step"
            v-reveal
            class="relative"
            :style="{ '--reveal-delay': `${index * 100}ms` }"
          >
            <span
              class="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border border-lantern-700 bg-harbor-900 font-mono text-sm text-lantern-500"
            >
              {{ step.step }}
            </span>
            <h3 class="text-xl text-paper-100">{{ step.title }}</h3>
            <p class="mt-2 max-w-xl leading-relaxed text-paper-300">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
