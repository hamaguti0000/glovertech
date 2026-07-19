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

const cardEls = ref<(HTMLElement | null)[]>([])

function setCardEl(el: unknown, index: number) {
  cardEls.value[index] = el as HTMLElement | null
}

let triggers: ScrollTrigger[] = []

onMounted(async () => {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { gsap } = await loadGsap()
  const { ScrollTrigger } = await loadScrollTrigger()
  gsap.registerPlugin(ScrollTrigger)

  const cards = cardEls.value.filter((el): el is HTMLElement => el !== null)

  cards.forEach((card, i) => {
    if (i === cards.length - 1) return
    triggers.push(
      ScrollTrigger.create({
        trigger: cards[i + 1],
        start: 'top bottom',
        end: 'top center',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(card, {
            scale: 1 - self.progress * 0.05,
            opacity: 1 - self.progress * 0.7,
          })
        },
      }),
    )
  })
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
})
</script>

<template>
  <section class="section-alt relative overflow-hidden border-b border-line">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute -right-24 -top-24 h-[460px] w-[460px] rounded-full bg-navy/[0.14] blur-3xl" />
    </div>
    <div class="section relative">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title">3つのステップで進めます</h2>
      <p class="section-lead">
        無料相談までは費用がかかりません。ご納得いただいた場合のみ、有料のAI業務診断へ進みます。各段階で終了いただいて構いません。
      </p>

      <div class="mt-14 space-y-6">
        <div
          v-for="(step, index) in steps"
          :key="step.step"
          :ref="(el) => setCardEl(el, index)"
          class="flow-card sticky rounded-lg border border-line bg-white p-8 shadow-[0_20px_45px_-30px_rgba(20,33,61,0.35)]"
          :style="{ top: `${88 + index * 14}px`, zIndex: index + 1 }"
        >
          <div class="grid gap-8 sm:grid-cols-[minmax(0,220px),1fr] sm:items-center">
            <div class="illustration-slot mx-auto w-full max-w-xs sm:mx-0">
              <img
                :src="illustrations[index].src"
                :alt="illustrations[index].alt"
                :width="illustrations[index].width"
                :height="illustrations[index].height"
                loading="lazy"
                class="h-full w-full object-contain"
              />
            </div>
            <div>
              <span class="font-barlow text-3xl font-bold text-gold">{{
                String(step.step).padStart(2, '0')
              }}</span>
              <h3 class="mt-2 text-xl">{{ step.title }}</h3>
              <p class="mt-2 max-w-xl text-base leading-[1.9] text-body">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flow-card {
  will-change: transform, opacity;
}
</style>
