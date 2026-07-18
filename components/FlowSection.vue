<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { FlowStep } from '~/data/site'

const props = defineProps<{
  steps: FlowStep[]
  label: string
}>()

const illustrations = [
  { src: '/images/flow-consultation.webp', alt: 'オンラインで相談している人のイラスト', width: 1254, height: 832 },
  { src: '/images/flow-report-review.webp', alt: 'レポートを確認している人のイラスト', width: 1254, height: 954 },
  { src: '/images/flow-success.webp', alt: '成果が出て喜んでいる人のイラスト', width: 1254, height: 1028 },
]

const containerEl = ref<HTMLElement | null>(null)
const stepEls = ref<(HTMLElement | null)[]>([])
const lineEl = ref<SVGLineElement | null>(null)
const lineLength = ref(0)
const dashOffset = ref(0)
const drawn = ref<boolean[]>(props.steps.map(() => false))

function setStepEl(el: unknown, index: number) {
  stepEls.value[index] = el as HTMLElement | null
}

let progressTrigger: ScrollTrigger | null = null
let stepTriggers: ScrollTrigger[] = []

onMounted(async () => {
  if (typeof window === 'undefined' || !containerEl.value) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  lineLength.value = containerEl.value.offsetHeight

  if (reduceMotion) {
    dashOffset.value = 0
    drawn.value = props.steps.map(() => true)
    return
  }

  dashOffset.value = lineLength.value

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  if (!containerEl.value) return

  progressTrigger = ScrollTrigger.create({
    trigger: containerEl.value,
    start: 'top 85%',
    end: 'bottom 85%',
    scrub: 0.6,
    onRefresh: () => {
      if (containerEl.value) lineLength.value = containerEl.value.offsetHeight
    },
    onUpdate: (self) => {
      dashOffset.value = lineLength.value * (1 - self.progress)
    },
  })

  stepTriggers = stepEls.value
    .map((el, i) => {
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          drawn.value[i] = true
        },
      })
    })
    .filter((t): t is ScrollTrigger => t !== null)
})

onUnmounted(() => {
  progressTrigger?.kill()
  stepTriggers.forEach((t) => t.kill())
})
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title">3つのステップで進めます</h2>
      <p class="section-lead">
        無料相談までは費用がかかりません。ご納得いただいた場合のみ、有料のAI業務診断へ進みます。各段階で終了いただいて構いません。
      </p>

      <div ref="containerEl" class="relative mt-14 pl-10">
        <svg class="absolute left-0 top-0 h-full w-6 overflow-visible" aria-hidden="true">
          <line x1="1" y1="0" x2="1" :y2="lineLength" stroke="#E4E0D6" stroke-width="2" />
          <line
            ref="lineEl"
            x1="1"
            y1="0"
            x2="1"
            :y2="lineLength"
            stroke="#14213D"
            stroke-width="2"
            :stroke-dasharray="lineLength"
            :stroke-dashoffset="dashOffset"
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
              <circle cx="14" cy="14" r="12" fill="white" stroke="#E4E0D6" stroke-width="2" />
              <circle
                cx="14"
                cy="14"
                r="12"
                fill="none"
                stroke="#C08A2E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="75.4"
                :stroke-dashoffset="drawn[index] ? 0 : 75.4"
                style="transition: stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1)"
              />
              <text
                x="14"
                y="18"
                text-anchor="middle"
                font-size="12"
                font-weight="700"
                font-family="'Barlow Condensed', sans-serif"
                fill="#14213D"
              >{{ step.step }}</text>
            </svg>
            <div class="illustration-slot mb-4 max-w-xs">
              <img
                :src="illustrations[index].src"
                :alt="illustrations[index].alt"
                :width="illustrations[index].width"
                :height="illustrations[index].height"
                loading="lazy"
                class="h-full w-full object-contain"
              />
            </div>
            <h3 class="text-xl">{{ step.title }}</h3>
            <p class="mt-2 max-w-xl text-base leading-[1.9] text-body">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
