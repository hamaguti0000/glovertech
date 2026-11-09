<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  value: number
  suffix?: string
  label: string
}>()

const displayValue = ref(0)
const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined' || !el.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayValue.value = props.value
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry.isIntersecting) return
      observer?.disconnect()
      void import('gsap').then(({ gsap }) => {
        const counter = { val: 0 }
        gsap.to(counter, {
          val: props.value,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            displayValue.value = Math.round(counter.val)
          },
        })
      })
    },
    { threshold: 0.4 },
  )
  observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="el">
    <p class="font-barlow text-4xl font-bold text-navy sm:text-5xl">
      {{ displayValue }}<span class="text-2xl sm:text-3xl">{{ suffix }}</span>
    </p>
    <p class="mt-1 text-sm text-body">{{ label }}</p>
  </div>
</template>
