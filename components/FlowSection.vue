<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import type { FlowStep } from '~/data/site'

const props = defineProps<{
  steps: FlowStep[]
}>()

const containerEl = ref<HTMLElement | null>(null)
const stepEls = ref<(HTMLElement | null)[]>([])
const lineLength = ref(0)
const dashOffset = ref(0)
const stepFractions = ref<number[]>(props.steps.map(() => 0))
const drawn = ref<boolean[]>(props.steps.map(() => false))
const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let ticking = false

function measure() {
  if (!containerEl.value) return
  lineLength.value = containerEl.value.offsetHeight
  stepFractions.value = stepEls.value.map((el) => {
    if (!el || !containerEl.value || containerEl.value.offsetHeight === 0) return 0
    return el.offsetTop / containerEl.value.offsetHeight
  })
}

function updateProgress() {
  if (containerEl.value) {
    const rect = containerEl.value.getBoundingClientRect()
    const start = window.innerHeight * 0.85
    const progress = Math.min(Math.max((start - rect.top) / rect.height, 0), 1)
    dashOffset.value = lineLength.value * (1 - progress)
    stepFractions.value.forEach((fraction, i) => {
      if (progress >= fraction - 0.02) drawn.value[i] = true
    })
  }
  ticking = false
}

function handleScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateProgress)
}

function setStepEl(el: unknown, index: number) {
  stepEls.value[index] = el as HTMLElement | null
}

onMounted(async () => {
  await nextTick()
  measure()

  if (reduceMotion) {
    dashOffset.value = 0
    drawn.value = props.steps.map(() => true)
    return
  }

  dashOffset.value = lineLength.value
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', measure)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <h2 v-reveal class="section-title">3つのステップで進めます</h2>
      <p class="section-lead">
        無料相談とレポートまでは費用がかかりません。ご納得いただけない場合は、そこで終了して構いません。
      </p>

      <div ref="containerEl" class="relative mt-14 pl-10">
        <svg class="absolute left-0 top-0 h-full w-6 overflow-visible" aria-hidden="true">
          <line x1="1" y1="0" x2="1" :y2="lineLength" stroke="#E2E8EB" stroke-width="2" />
          <line
            x1="1"
            y1="0"
            x2="1"
            :y2="lineLength"
            stroke="#0E5E6F"
            stroke-width="2"
            :stroke-dasharray="lineLength"
            :stroke-dashoffset="dashOffset"
            style="transition: stroke-dashoffset 200ms linear"
          />
        </svg>

        <ol class="space-y-10">
          <li
            v-for="(step, index) in steps"
            :key="step.step"
            :ref="(el) => setStepEl(el, index)"
            class="relative"
          >
            <svg class="absolute -left-10 top-0 h-7 w-7" viewBox="0 0 28 28" aria-hidden="true">
              <circle cx="14" cy="14" r="12" fill="white" stroke="#E2E8EB" stroke-width="2" />
              <circle
                cx="14"
                cy="14"
                r="12"
                fill="none"
                stroke="#0E5E6F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="75.4"
                :stroke-dashoffset="drawn[index] ? 0 : 75.4"
                style="transition: stroke-dashoffset 500ms cubic-bezier(0.22, 1, 0.36, 1)"
              />
              <text x="14" y="18" text-anchor="middle" font-size="11" fill="#0E5E6F">{{ step.step }}</text>
            </svg>
            <h3 class="text-lg text-heading">{{ step.title }}</h3>
            <p class="mt-2 max-w-xl text-base leading-[1.9] text-body">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
