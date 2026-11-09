export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('reveal-visible')
        return
      }

      el.classList.add('reveal')

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('reveal-visible')
              observer.unobserve(el)
            }
          }
        },
        { threshold: 0.15 },
      )
      observer.observe(el)
    },
  })
})
