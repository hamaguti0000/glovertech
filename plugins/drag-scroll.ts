// マウスでの掴んで動かすスクロール操作(Apple Design: Direct manipulation, 1:1 tracking)
// タッチデバイスはネイティブのスクロール/スナップに任せる
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('drag-scroll', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      if (window.matchMedia('(pointer: coarse)').matches) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      let dragging = false
      let startX = 0
      let scrollStart = 0

      el.style.cursor = 'grab'

      function handlePointerDown(e: PointerEvent) {
        if (e.button !== 0) return
        dragging = true
        el.setPointerCapture(e.pointerId)
        startX = e.clientX
        scrollStart = el.scrollLeft
        el.style.cursor = 'grabbing'
        el.style.scrollSnapType = 'none'
      }

      function handlePointerMove(e: PointerEvent) {
        if (!dragging) return
        el.scrollLeft = scrollStart - (e.clientX - startX)
      }

      function endDrag() {
        if (!dragging) return
        dragging = false
        el.style.cursor = 'grab'
        el.style.scrollSnapType = ''
      }

      el.addEventListener('pointerdown', handlePointerDown)
      el.addEventListener('pointermove', handlePointerMove)
      el.addEventListener('pointerup', endDrag)
      el.addEventListener('pointercancel', endDrag)
    },
  })
})
