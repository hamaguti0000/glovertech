export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('magnetic', {
    getSSRProps() {
      return {}
    },
    async mounted(el: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (window.matchMedia('(pointer: coarse)').matches) return

      const { gsap } = await import('gsap')
      const strength = 0.25

      function handleMove(e: MouseEvent) {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) * strength
        const y = (e.clientY - rect.top - rect.height / 2) * strength
        gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
      }

      function handleLeave() {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
      }

      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
    },
  })
})
