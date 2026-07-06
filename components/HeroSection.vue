<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}>()

const canvasEl = ref<HTMLCanvasElement | null>(null)

function drawNightView(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)

  // 稲佐山から望む長崎港の夜景をモチーフにした、港町の灯り
  let seed = 42
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  for (let i = 0; i < 320; i++) {
    const x = random() * width
    const y = Math.pow(random(), 1.4) * height
    const r = random() * 1.5 + 0.4
    const opacity = random() * 0.7 + 0.15
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(240, 200, 120, ${opacity})`
    ctx.fill()
  }

  for (let i = 0; i < 16; i++) {
    const x = random() * width
    const y = Math.pow(random(), 1.4) * height
    const r = random() * 12 + 8
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
    gradient.addColorStop(0, 'rgba(240, 200, 120, 0.35)')
    gradient.addColorStop(1, 'rgba(240, 200, 120, 0)')
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
  }
}

function handleResize() {
  if (canvasEl.value) drawNightView(canvasEl.value)
}

onMounted(() => {
  if (canvasEl.value) drawNightView(canvasEl.value)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section pb-16 pt-28 sm:pt-36">
      <p class="section-eyebrow">長崎 ・ AI導入 / 業務効率化支援</p>

      <h1 class="mt-6 max-w-2xl text-4xl leading-[1.4] text-paper-100 sm:text-5xl sm:leading-[1.35]">
        {{ title }}
      </h1>

      <p class="section-lead">
        {{ subtitle }}
      </p>

      <div class="mt-10">
        <a :href="ctaHref" class="btn-primary">
          {{ ctaLabel }}
        </a>
      </div>
    </div>

    <div class="relative h-52 overflow-hidden sm:h-72">
      <div
        class="absolute inset-x-0 bottom-0 h-[70%] bg-harbor-800"
        style="clip-path: polygon(0% 46%, 5% 30%, 11% 44%, 18% 20%, 26% 38%, 34% 14%, 43% 32%, 52% 12%, 61% 34%, 70% 18%, 79% 40%, 88% 22%, 100% 36%, 100% 100%, 0% 100%)"
        aria-hidden="true"
      />
      <canvas ref="canvasEl" class="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  </section>
</template>
