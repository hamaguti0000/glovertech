<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Problem } from '~/data/site'

defineProps<{
  problems: Problem[]
}>()

const rootEl = ref<HTMLElement | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ctx: any = null

onMounted(async () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || !rootEl.value) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.problem-card')
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        endTrigger: cards[cards.length - 1],
        end: 'top top',
        pin: true,
        pinSpacing: false,
      })
      gsap.to(card, {
        scale: 0.94,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[i + 1],
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      })
    })
  }, rootEl.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section pb-10">
      <h2 class="section-title max-w-xl">日々の業務で、こんなことが起きていませんか</h2>
    </div>

    <div ref="rootEl" class="relative">
      <article
        v-for="(problem, index) in problems"
        :key="problem.title"
        class="problem-card sticky top-0 flex min-h-[100dvh] items-center border-t border-harbor-700 bg-harbor-900"
      >
        <div
          class="section flex flex-col gap-4"
          :class="index % 2 === 1 ? 'items-end text-right' : 'items-start text-left'"
        >
          <h3 class="max-w-2xl font-display text-4xl leading-tight text-paper-100 sm:text-5xl">
            {{ problem.title }}
          </h3>
          <p class="max-w-lg text-lg leading-relaxed text-paper-300">
            {{ problem.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
