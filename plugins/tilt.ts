import { loadGsap } from '~/composables/useGsap'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tilt', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (window.matchMedia('(pointer: coarse)').matches) return

      const maxTilt = 5
      el.style.transformStyle = 'preserve-3d'

      // マウスが実際に乗るまでgsapを読み込まない(初期表示の負荷を避ける)
      async function handleMove(e: MouseEvent) {
        const { gsap } = await loadGsap()
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

      async function handleLeave() {
        // 手を離した瞬間だけスプリングで戻す(Apple Design: momentum-driven bounce)
        const { gsap } = await loadGsap()
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.6)' })
      }

      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
    },
  })
})
