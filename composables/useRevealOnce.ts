import { onMounted, onUnmounted, ref } from 'vue'

export function useRevealOnce(threshold = 0.4) {
  const targetEl = ref<HTMLElement | null>(null)
  const revealed = ref(true)
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (reduceMotion || !targetEl.value) return

    revealed.value = false

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        revealed.value = true
        observer?.unobserve(entry.target)
      },
      { threshold },
    )
    observer.observe(targetEl.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { targetEl, revealed, reduceMotion }
}
