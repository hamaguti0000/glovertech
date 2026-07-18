export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tilt', {
    getSSRProps() {
      return {}
    },
    async mounted(el: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (window.matchMedia('(pointer: coarse)').matches) return

      const { gsap } = await import('gsap')
      const maxTilt = 5

      el.style.transformStyle = 'preserve-3d'

      function handleMove(e: MouseEvent) {
        const rect = el.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(el, {
          rotateX: -py * maxTilt,
          rotateY: px * maxTilt,
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      function handleLeave() {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' })
      }

      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
    },
  })
})
