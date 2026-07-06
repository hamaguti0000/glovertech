<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}>()

interface Light {
  x: number
  y: number
  r: number
  baseOpacity: number
  phase: number
  speed: number
  glow: boolean
}

const canvasEl = ref<HTMLCanvasElement | null>(null)
let lights: Light[] = []
let rafId: number | null = null

function buildLights(width: number, height: number) {
  let seed = 42
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  const next: Light[] = []

  // 稲佐山から望む長崎港の夜景をモチーフにした、港町の灯り
  for (let i = 0; i < 320; i++) {
    next.push({
      x: random() * width,
      y: Math.pow(random(), 1.4) * height,
      r: random() * 1.5 + 0.4,
      baseOpacity: random() * 0.6 + 0.2,
      phase: random() * Math.PI * 2,
      speed: random() * 0.6 + 0.3,
      glow: false,
    })
  }

  for (let i = 0; i < 16; i++) {
    next.push({
      x: random() * width,
      y: Math.pow(random(), 1.4) * height,
      r: random() * 12 + 8,
      baseOpacity: 0.35,
      phase: random() * Math.PI * 2,
      speed: random() * 0.3 + 0.15,
      glow: true,
    })
  }

  return next
}

function renderFrame(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, animate: boolean) {
  ctx.clearRect(0, 0, width, height)

  for (const light of lights) {
    const flicker = animate ? Math.sin(time * light.speed + light.phase) * 0.35 : 0
    const opacity = Math.min(1, Math.max(0, light.baseOpacity + flicker * light.baseOpacity))

    if (light.glow) {
      const gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.r)
      gradient.addColorStop(0, `rgba(240, 200, 120, ${opacity})`)
      gradient.addColorStop(1, 'rgba(240, 200, 120, 0)')
      ctx.beginPath()
      ctx.arc(light.x, light.y, light.r, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.arc(light.x, light.y, light.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(240, 200, 120, ${opacity})`
      ctx.fill()
    }
  }
}

function setupCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  lights = buildLights(width, height)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    renderFrame(ctx, width, height, 0, false)
    return
  }

  const loop = (time: number) => {
    renderFrame(ctx, width, height, time / 1000, true)
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
}

function handleResize() {
  if (rafId !== null) cancelAnimationFrame(rafId)
  if (canvasEl.value) setupCanvas(canvasEl.value)
}

onMounted(() => {
  if (canvasEl.value) setupCanvas(canvasEl.value)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (rafId !== null) cancelAnimationFrame(rafId)
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
